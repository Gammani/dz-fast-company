import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Edit from "./components/edit";

function App() {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route path={"/"} exact component={Main}/>
                <Route path={"/login/:type?"} component={Login}/>
                <Route path={"/users/:userId?"} exact component={Users}/>
                <Route path={"/users/:userId?/:edit?"} exact component={Edit}/>
                <Redirect to={"/"}/>
            </Switch>
        </div>
    );
}

export default App;
