import styled from "styled-components";

export const Global = styled.div`
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
    background-color: #545149;
`;

export const LeftBar = styled.div`
    width: 20vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;
export const LeftBarTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const ResourcesWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const TopBarSection = styled.div`
    display: flex;
    height: 40px;
    background-color: white;
    align-items: flex-end;
`;

export const SectionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50%;
`;
