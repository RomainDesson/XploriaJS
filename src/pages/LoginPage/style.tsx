import styled from "styled-components";
import background from "../../static/assets/LoginPageBackground.png";
import dirt from "../../static/assets/DirtTexture.png";

export const LoginPageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-image: url(${background});
    background-position: center;
    background-size: auto;
`;

export const LoginWrapper = styled.div`
    position: absolute;
    width: 25%;
    background-color: rgba(0, 0, 0, 0.5);
    padding-top: 50px;
    padding-bottom: 50px;
    top: 170px;
`;

export const TabWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const StyledInput = styled.input`
    //background-image: url(${dirt});
    background-color: rgba(128, 115, 98, 1);
    background-size: contain;
    border: 1px solid lightgray;
    height: 2rem;
    font-size: 18px;
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    color: white;
`;

export const UsernameWrapper = styled.div`
    font-size: 18px;
    color: white;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
`;

export const InputTitle = styled.span`
    font-size: 26px;
    -webkit-text-stroke: 0.1px black;
    font-weight: bold;
`;

export const PasswordWrapper = styled.div`
    font-size: 18px;
    color: white;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
`;

export const StyledButton = styled.button`
    border: none;
    min-width: 200px;
    height: 2rem;
    margin-bottom: 1rem;
    font-size: 18px;
`;
