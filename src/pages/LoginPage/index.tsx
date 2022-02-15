import { useState } from "react";
import { AuthURL } from "../../api/routes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";

export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const {
        state: { user },
        dispatch,
    } = useUser();
    const loginButtonCallback = () => {
        setError(false);
        axios
            .post(AuthURL, { identifier: username, password: password })
            .then((response) => {
                dispatch({ type: "SET_USER", payload: response.data.user });
                localStorage.setItem("jwt", response.data.jwt);
                navigate("/character");
            })
            .catch((error) => {
                setError(true);
                console.log(error);
            });
    };
    const createButtonCallback = async () => {
        setError(false);
        const { data } = await axios.post(`${AuthURL}/register`, { username: username, password: password, email: email });
        if (data) {
            localStorage.setItem("jwt", data.jwt);
        }
    };
    return (
        <>
            <div>
                username
                <input onChange={(e) => setUsername(e.target.value)} />
                password
                <input onChange={(e) => setPassword(e.target.value)} />
                <button onClick={loginButtonCallback}>send</button>
                {error ? "not good" : ""}
            </div>
            <div>
                username
                <input onChange={(e) => setUsername(e.target.value)} />
                password
                <input onChange={(e) => setPassword(e.target.value)} />
                email
                <input onChange={(e) => setEmail(e.target.value)} />
                <button onClick={createButtonCallback}>send</button>
                {error ? "not good" : ""}
            </div>
        </>
    );
};
