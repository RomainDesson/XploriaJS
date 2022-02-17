import styled from "styled-components";

export const Global = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-color: #545149;
`;

export const ResourcesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 250px;
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
