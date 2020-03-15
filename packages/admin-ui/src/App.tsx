import React from "react";
import "./App.css";
import Login from "./views/Login";
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";

function App (): React.ReactElement {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
