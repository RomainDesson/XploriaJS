import { useState } from "react";
import { IMPROVE_LUMBERING, useUser } from "../../context/userContext";
import { getCostToUpgrade } from "./UpdgradingTable";
import axios from "axios";
import { UserURL } from "../../api/routes";
import { getApiData } from "./getApiData";

type UpgradeButtonProps = {
    numberOfResources: number;
    typeOfResources: string;
    gatheringSpeed: number;
    gatheringType: "IMPROVE_LUMBERING" | "IMPROVE_MINING" | "IMPROVE_FARMING" | "IMPROVE_DIGGING";
};

export const UpgradeButton = ({ numberOfResources, typeOfResources, gatheringSpeed, gatheringType }: UpgradeButtonProps) => {
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
    const upgradeCost = getCostToUpgrade(gatheringSpeed);
    const dispatchProps = {
        type: gatheringType,
        payload: { speed: gatheringSpeed, cost: upgradeCost },
    };
    const apiData = getApiData(typeOfResources, upgradeCost);

    const improveGatheringSpeed = async () => {
        setError(false);
        if (numberOfResources >= upgradeCost && gatheringSpeed < 20) {
            dispatch(dispatchProps);
            await axios.put(`${UserURL}/${user.id}`, apiData, headers);
        } else {
            setError(true);
        }
    };

    return (
        <div>
            <button onClick={improveGatheringSpeed}>Improve</button>
            <span>cost to improve: {upgradeCost}</span>
        </div>
    );
};
