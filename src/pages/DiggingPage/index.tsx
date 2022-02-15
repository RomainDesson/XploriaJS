import { useEffect, useState } from "react";
import axios from "axios";
import { ADD_FOOD, ADD_STONE, useUser } from "../../context/userContext";
import { UserURL } from "../../api/routes";
import { useNavigate } from "react-router-dom";
import { UpgradeButton } from "../../components/UpgradeButtons/UpgradeButton";

export const DiggingPage = () => {
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
        if (stoneCounter === 0) {
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

    return (
        <li>
            <ul>Digging</ul>
            <ul>next stone in : {stoneCounter}</ul>
            <span>actual speed: {user.diggingSpeed}</span>
            <UpgradeButton numberOfResources={user.stone} typeOfResources={"digging"} gatheringSpeed={user.diggingSpeed} gatheringType={"IMPROVE_DIGGING"} />
        </li>
    );
};
