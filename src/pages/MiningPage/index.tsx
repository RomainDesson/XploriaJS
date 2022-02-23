import { useEffect, useState } from "react";
import axios from "axios";
import { ADD_MINERALS, useUser } from "../../context/userContext";
import { UserURL } from "../../api/routes";
import { useNavigate } from "react-router-dom";
import { ResourcesModal } from "../../components/ResourcesModal";
import { ResourcesModalProps } from "../type";

export const MiningPage = ({ handleSwitchModal, isModalActive }: ResourcesModalProps) => {
    const [miningCounter, setMiningCounter] = useState<number>(5);
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
            setMiningCounter((miningCounter) => miningCounter - 1);
        }, 1000);
        if (miningCounter === 0 && isModalActive) {
            dispatch({ type: ADD_MINERALS, payload: user.miningSpeed });
            axios.put(
                `${UserURL}/${user?.id}`,
                {
                    minerals: user.minerals + user.miningSpeed,
                },
                headers
            );
            setMiningCounter(5);
        }
        return () => {
            clearInterval(interval);
        };
    }, [miningCounter]);

    return (
        <div>
            <span>Mining speed: {user.miningSpeed}</span>
        </div>
    );
};
