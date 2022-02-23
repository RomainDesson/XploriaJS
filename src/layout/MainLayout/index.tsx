import { ActionsCards } from "../../components/ActionsCards";
import { Global, LeftBar, LeftBarTop, ResourcesWrapper, SectionWrapper, TopBarSection } from "./style";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialState, SET_USER, useUser } from "../../context/userContext";
import { StyledButton } from "../../pages/LoginPage/style";
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
                <LeftBarTop>
                    <ActionsCards />
                    <ResourcesWrapper>
                        <span>
                            <img src={WoodIcon} />: {user.wood}
                        </span>
                        <span>
                            <img src={MineralsIcon} />: {user.minerals}
                        </span>
                        <span>
                            <img src={FoodIcon} />: {user.food}
                        </span>
                        <span>
                            <img src={StoneIcon} />: {user.stone}
                        </span>
                    </ResourcesWrapper>
                </LeftBarTop>
                <StyledButton onClick={logoutButtonCallback}>Logout</StyledButton>
            </LeftBar>
            {children}
        </Global>
    );
};
