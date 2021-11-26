import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";

function App() {
    return (
        <div>
            <NavBar/>
            <Switch>
                <ProfessionProvider>
                    <QualityProvider>
                        <Route path={"/users/:userId?/:edit?"} exact component={Users}/>
                        <Route path={"/login/:type?"} component={Login}/>
                    </QualityProvider>
                </ProfessionProvider>
                <Route path={"/"} exact component={Main}/>
                <Redirect to={"/"}/>
                <ToastContainer />
            </Switch>
        </div>
    );
}

export default App;
