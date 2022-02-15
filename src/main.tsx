import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./main.css";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider, initialState, UserContext } from "./context/userContext";

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>,

    document.getElementById("root")
);
