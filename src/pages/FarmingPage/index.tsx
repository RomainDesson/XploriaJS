import { useEffect, useState } from "react";
import axios from "axios";
import { ADD_FOOD, useUser } from "../../context/userContext";
import { UserURL } from "../../api/routes";
import { useNavigate } from "react-router-dom";
import { ResourcesModal } from "../../components/ResourcesModal";
import { ResourcesModalProps } from "../type";

export const FarmingPage = ({ isModalActive, handleSwitchModal }: ResourcesModalProps) => {
    const [foodCounter, setFoodCounter] = useState<number>(5);
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
            setFoodCounter((foodCounter) => foodCounter - 1);
        }, 1000);
        if (foodCounter === 0 && isModalActive) {
            dispatch({ type: ADD_FOOD, payload: user.farmingSpeed });
            axios.put(
                `${UserURL}/${user?.id}`,
                {
                    food: user.food + user.farmingSpeed,
                },
                headers
            );
            setFoodCounter(5);
        }
        return () => {
            clearInterval(interval);
        };
    }, [foodCounter]);

    const handleModalOpening = () => {
        if (!isModalActive) {
            handleSwitchModal(3);
            setFoodCounter(5);
        } else {
            handleSwitchModal(0);
        }
    };

    return (
        <div>
            {isModalActive && (
                <ResourcesModal counter={foodCounter} gatheringSpeed={user.farmingSpeed} typeOfResources={"farming"} numberOfResources={user.food} gatheringType={"IMPROVE_FARMING"} />
            )}
            <button onClick={handleModalOpening}>Farming</button>
        </div>
    );
};
