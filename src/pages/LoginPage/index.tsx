import { useState } from "react";
import { AuthURL } from "../../api/routes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SET_USER, useUser } from "../../context/userContext";
import { InputTitle, LoginPageWrapper, LoginTabWrapper, LoginWrapper, PasswordWrapper, StyledButton, StyledInput, TabWrapper, UsernameTitle, UsernameWrapper } from "./style";

export const LoginPage = () => {
    const LOGIN_TAB = 1;
    const REGISTER_TAB = 2;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [activeTab, setActiveTab] = useState(LOGIN_TAB);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const {
        state: { user },
        dispatch,
    } = useUser();
    const loginButtonCallback = () => {
        setError(false);
        axios
            .post(AuthURL, { identifier: username, password: password })
            .then((response) => {
                dispatch({ type: SET_USER, payload: response.data.user });
                localStorage.setItem("jwt", response.data.jwt);
                navigate("/character");
            })
            .catch((error) => {
                setError(true);
                console.log(error);
            });
    };
    const createButtonCallback = async () => {
        setError(false);
        const { data } = await axios.post(`${AuthURL}/register`, { username: username, password: password, email: email });
        if (data) {
            localStorage.setItem("jwt", data.jwt);
        }
    };
    const handleSwitchTab = () => {
        if (activeTab === LOGIN_TAB) {
            setActiveTab(REGISTER_TAB);
        }
        if (activeTab === REGISTER_TAB) {
            setActiveTab(LOGIN_TAB);
        }
    };
    return (
        <LoginPageWrapper>
            <LoginWrapper>
                {activeTab === LOGIN_TAB ? (
                    <TabWrapper>
                        <UsernameWrapper>
                            <InputTitle>Username</InputTitle>
                            <StyledInput onChange={(e) => setUsername(e.target.value)} />
                        </UsernameWrapper>
                        <PasswordWrapper>
                            <InputTitle>Password</InputTitle>
                            <StyledInput onChange={(e) => setPassword(e.target.value)} />
                        </PasswordWrapper>
                        <StyledButton onClick={loginButtonCallback}>Login</StyledButton>
                        <StyledButton onClick={handleSwitchTab}>Create account</StyledButton>
                    </TabWrapper>
                ) : (
                    <TabWrapper>
                        <UsernameWrapper>
                            <InputTitle>Username</InputTitle>
                            <StyledInput onChange={(e) => setUsername(e.target.value)} />
                        </UsernameWrapper>
                        <UsernameWrapper>
                            <InputTitle>Password</InputTitle>
                            <StyledInput onChange={(e) => setPassword(e.target.value)} />
                        </UsernameWrapper>
                        <UsernameWrapper>
                            <InputTitle>Email</InputTitle>
                            <StyledInput onChange={(e) => setEmail(e.target.value)} />
                        </UsernameWrapper>
                        <StyledButton onClick={createButtonCallback}>Create</StyledButton>
                        <StyledButton onClick={handleSwitchTab}>Login</StyledButton>
                    </TabWrapper>
                )}
            </LoginWrapper>
        </LoginPageWrapper>
    );
};
