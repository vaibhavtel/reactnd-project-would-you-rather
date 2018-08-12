import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-theme.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import NavbarComponent from "./components/NavbarComponent";
import configureStore from "./utils/configureStore";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Fragment>
                <NavbarComponent />
                <Route path="/" exact component={LoginPage} />
                {/* <Route path="/home" component={Home} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route path="/addQuestion" component={NewQuestion} />
                <Route path="/vote/:question_id" component={QuestionVote} />
                <Route path="/questions/:question_id" component={QuestionResult} /> */}
            </Fragment>
        </Router>
    </Provider>,
    document.getElementById("root")
);
