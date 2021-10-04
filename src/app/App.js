import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Users from "./layouts/users";
import NavBar from "./components/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";

function App() {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route path={"/"} exact component={Main}/>
                <Route path={"/login"} component={Login}/>
                <Route path={"/users/:userId?"} exact component={Users}/>
                <Redirect to={"/"}/>
            </Switch>
        </div>
    );
}

export default App;
