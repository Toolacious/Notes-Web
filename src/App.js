import "./App.css";
import Routes from "./routes/Routes";

import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { setAccessToken } from "./accessToken";
import { AuthContext } from "./routes/auth";

function App() {
    const [loading, setLoading] = useState(true);
    const context = useContext(AuthContext);
    useEffect(() => {
        fetch("http://localhost:4000/refresh_token", {
            method: "POST",
            credentials: "include",
        }).then(async (res) => {
            const data = await res.json();
            console.log("app----");
            console.log(data);
            if (data.accessToken) {
                setAccessToken(data.accessToken);
                if (!context.user) context.login(data);
            } else console.log("no access Token, Please login");
            setLoading(false);
        });
    }, []);
    return (
        <div className="App">
            <Router>{loading ? <div>loading...</div> : <Routes />}</Router>
        </div>
    );
}

export default App;
