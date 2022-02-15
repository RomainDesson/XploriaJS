import { useEffect, useState } from "react";
import axios from "axios";
import { ADD_FOOD, useUser } from "../../context/userContext";
import { UserURL } from "../../api/routes";
import { useNavigate } from "react-router-dom";
import { UpgradeButton } from "../../components/UpgradeButtons/UpgradeButton";

export const FarmingPage = () => {
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
        if (foodCounter === 0) {
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

    return (
        <li>
            <ul>Farming</ul>
            <ul>next food in : {foodCounter}</ul>
            <span>actual speed: {user.farmingSpeed}</span>
            <UpgradeButton numberOfResources={user.food} typeOfResources={"farming"} gatheringSpeed={user.farmingSpeed} gatheringType={"IMPROVE_FARMING"} />
        </li>
    );
};
