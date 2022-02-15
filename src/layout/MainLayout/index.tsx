import { ActionsCards } from "../../components/ActionsCards";
import { Global, LeftBar } from "./style";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initialState, useUser } from "../../context/userContext";

export const MainLayout = ({ children }: any) => {
    const {
        state: { user },
        dispatch,
    } = useUser();
    const isLogged = localStorage.getItem("jwt");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged) {
            navigate("/");
        }
    }, [isLogged]);

    const logoutButtonCallback = () => {
        dispatch({ type: "SET_USER", payload: initialState });
    };

    if (!user || user.role.id === 0) {
        localStorage.removeItem("jwt");
        navigate("/");
        return null;
    }

    return (
        <Global>
            <LeftBar>
                <ActionsCards />
                <input type="button" onClick={logoutButtonCallback} value="logout" />
                <span>Wood: {user.wood}</span>
                <span>Minerals: {user.minerals}</span>
                <span>Food: {user.food}</span>
            </LeftBar>
            {children}
        </Global>
    );
};
