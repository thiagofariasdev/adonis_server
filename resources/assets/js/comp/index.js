import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Chat } from './scenes';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/app" component={Chat.Screen} />
            </Switch>
        </Router>
    )
}
