import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/userContext";
import { UserURL } from "../../api/routes";
import { useNavigate } from "react-router-dom";

export const LumberingPage = () => {
    const navigate = useNavigate();
    const [lumberingCounter, setLumberingCounter] = useState<number>(5);
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
            setLumberingCounter((lumberingCounter) => lumberingCounter - 1);
        }, 1000);
        if (lumberingCounter === 0) {
            dispatch({ type: "ADD_WOOD", payload: user.lumberingSpeed });
            axios.put(
                `${UserURL}/${user?.id}`,
                {
                    wood: user.wood + user.lumberingSpeed,
                },
                headers
            );
            setLumberingCounter(5);
        }
        return () => {
            clearInterval(interval);
        };
    }, [lumberingCounter]);

    return (
        <li>
            <ul>Lumbering</ul>
            <ul>next log in : {lumberingCounter}</ul>
            <ul>Lumbering speed: {user.lumberingSpeed}</ul>
        </li>
    );
};
