import { useEffect, useState } from "react";
import axios from "axios";
import { ADD_STONE, useUser } from "../../context/userContext";
import { UserURL } from "../../api/routes";
import { useNavigate } from "react-router-dom";
import { ResourcesModal } from "../../components/ResourcesModal";
import { ResourcesModalProps } from "../type";

export const DiggingPage = ({ isModalActive, handleSwitchModal }: ResourcesModalProps) => {
    const [stoneCounter, setStoneCounter] = useState<number>(5);
    const navigate = useNavigate();
    const {
        state: { user },
        dispatch,
    } = useUser();

    if (!user) {
        navigate("/");
        return null;
    }

    const headers = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setStoneCounter((stoneCounter) => stoneCounter - 1);
        }, 1000);
        if (stoneCounter === 0 && isModalActive) {
            dispatch({ type: ADD_STONE, payload: user.diggingSpeed });
            axios.put(
                `${UserURL}/${user?.id}`,
                {
                    stone: user.stone + user.diggingSpeed,
                },
                headers
            );
            setStoneCounter(5);
        }
        return () => {
            clearInterval(interval);
        };
    }, [stoneCounter]);

    const handleModalOpening = () => {
        if (!isModalActive) {
            handleSwitchModal(4);
            setStoneCounter(5);
        } else {
            handleSwitchModal(0);
        }
    };

    return (
        <div>
            {isModalActive && (
                <ResourcesModal counter={stoneCounter} gatheringSpeed={user.diggingSpeed} numberOfResources={user.stone} typeOfResources={"mining"} gatheringType={"IMPROVE_DIGGING"} />
            )}
            <button onClick={handleModalOpening}>Digging</button>
        </div>
    );
};
