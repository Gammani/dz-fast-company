import React from "react";
import Users from "./components/users";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./components/main";
import Login from "./components/login";

function App() {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route path={"/"} exact component={Main}/>
                <Route path={"/login"} component={Login}/>
                <Route path={"/users/:userId?"} exact component={Users}/>
            </Switch>
        </div>
    );
}

export default App;
