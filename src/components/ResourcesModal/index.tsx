import { ModalWrapper } from "./style";
import { UpgradeButton } from "../UpgradeButtons/UpgradeButton";

type ResourcesModalProps = {
    counter: number;
    gatheringSpeed: number;
    numberOfResources: number;
    typeOfResources: string;
    gatheringType: "IMPROVE_LUMBERING" | "IMPROVE_MINING" | "IMPROVE_FARMING" | "IMPROVE_DIGGING";
};

export const ResourcesModal = ({ counter, gatheringSpeed, numberOfResources, typeOfResources, gatheringType }: ResourcesModalProps) => {
    return (
        <ModalWrapper>
            <div>{counter}</div>
            <div>gathering speed : {gatheringSpeed}</div>
            <UpgradeButton numberOfResources={numberOfResources} typeOfResources={typeOfResources} gatheringSpeed={gatheringSpeed} gatheringType={gatheringType} />
        </ModalWrapper>
    );
};
