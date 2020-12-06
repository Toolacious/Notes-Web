import "./App.css";
import AuthApi from "./utils/AuthApi";
import Routes from "./routes/Routes";

import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
    const [auth, setAuth] = useState(false);
    return (
        <div className="App">
            <AuthApi.Provider value={{ auth, setAuth }}>
                <Router>
                    <Routes />
                </Router>
            </AuthApi.Provider>
        </div>
    );
}

export default App;
