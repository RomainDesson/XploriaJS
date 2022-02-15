import { useUser } from "../../context/userContext";

type GetApiDataProps = {
    entity: string;
    upgradeCost: number;
};

export const getApiData = (entity: string, upgradeCost: number) => {
    const {
        state: { user },
    } = useUser();
    switch (entity) {
        case "lumbering":
            return {
                lumberingSpeed: user.lumberingSpeed,
                wood: user.wood - upgradeCost,
            };
        case "mining":
            return {
                miningSpeed: user.miningSpeed,
                minerals: user.minerals - upgradeCost,
            };
        case "farming":
            return {
                farmingSpeed: user.farmingSpeed,
                food: user.food - upgradeCost,
            };
        case "digging":
            return {
                diggingSpeed: user.diggingSpeed,
                stone: user.stone - upgradeCost,
            };
    }
    return { data: 1 };
};
