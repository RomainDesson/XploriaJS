import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./main.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>,

    document.getElementById("root")
);
