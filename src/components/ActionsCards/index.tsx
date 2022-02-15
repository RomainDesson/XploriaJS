import { Card } from "./style";
import { useNavigate } from "react-router-dom";

export const ActionsCards = () => {
    const navigate = useNavigate();
    return (
        <>
            <Card onClick={() => navigate("/character")}>Character</Card>
            <Card onClick={() => navigate("/lumbering")}>Lumbering</Card>
            <Card onClick={() => navigate("/mining")}>Mining</Card>
            <Card onClick={() => navigate("/farming")}>Farming</Card>
            <Card onClick={() => navigate("/digging")}>Digging</Card>
        </>
    );
};
