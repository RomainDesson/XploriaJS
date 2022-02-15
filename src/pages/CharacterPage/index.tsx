import { useUser } from "../../context/userContext";
import axios from "axios";
import { UserURL } from "../../api/routes";
import { useState } from "react";

export const CharacterPage = () => {
    const [error, setError] = useState(false);
    const {
        state: { user },
        dispatch,
    } = useUser();
    const headers = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    };
    const improveLumberingSpeed = () => {
        setError(false);
        if (user.wood >= 50) {
            dispatch({ type: "IMPROVE_LUMBERING", payload: user.lumberingSpeed + 1 });
            axios.put(
                `${UserURL}/${user.id}`,
                {
                    lumberingSpeed: user?.lumberingSpeed,
                    wood: user.wood - 50,
                },
                headers
            );
        } else {
            setError(true);
        }
    };
    return (
        <div>
            <button onClick={improveLumberingSpeed}>Improve lumbering speed</button>
            {error && <span>Not enough wood</span>}
        </div>
    );
};
