import { ActionsCards } from "../../components/ActionsCards";
import { Global, LeftBar, ResourcesWrapper, SectionWrapper, TopBarSection } from "./style";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialState, SET_USER, useUser } from "../../context/userContext";
import { LumberingPage } from "../../pages/LumberingPage";
import { MiningPage } from "../../pages/MiningPage";
import { FarmingPage } from "../../pages/FarmingPage";
import { DiggingPage } from "../../pages/DiggingPage";
import WoodIcon from "../../static/assets/wood-icon.png";
import MineralsIcon from "../../static/assets/minerals-icon.png";
import FoodIcon from "../../static/assets/food-icon.png";
import StoneIcon from "../../static/assets/stone-icon.png";

export const MainLayout = ({ children }: any) => {
    const {
        state: { user },
        dispatch,
    } = useUser();
    const isLogged = localStorage.getItem("jwt");
    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState(0);

    useEffect(() => {
        if (!isLogged) {
            navigate("/");
        }
    }, [isLogged]);

    const logoutButtonCallback = () => {
        dispatch({ type: SET_USER, payload: initialState });
    };

    if (!user || user.role.id === 0) {
        localStorage.removeItem("jwt");
        navigate("/");
        return null;
    }

    const handleSwitchModal = (modal: number) => {
        setActiveModal(modal);
    };

    return (
        <Global>
            <LeftBar>
                <ActionsCards />
                <button onClick={logoutButtonCallback}>Logout</button>
            </LeftBar>
            {children}
        </Global>
    );
};
