import React from "react";

import { Switch } from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Blog from "../components/Blogs/Blog";
import AuthRoute from "./authRoute";
import ProtectRoute from "./protectRoute";
function Routes() {
    return (
        <Switch>
            <AuthRoute exact path="/" component={SignIn} />
            <AuthRoute exact path="/login" component={SignIn} />
            <AuthRoute exact path="/signup" component={SignUp} />
            <ProtectRoute exact path="/dashboard" component={Blog} />
        </Switch>
    );
}

export default Routes;
