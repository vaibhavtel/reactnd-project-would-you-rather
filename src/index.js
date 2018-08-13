import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-theme.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AddQuestionPage from "./pages/AddQuestionPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import NavbarComponent from "./components/NavbarComponent";
import configureStore from "./utils/configureStore";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Fragment>
                <NavbarComponent />
                <Route path="/" exact component={LoginPage} />
                <Route path="/home" component={HomePage} />
                <Route path="/add" component={AddQuestionPage} />
                <Route path="/leaderboard" component={LeaderboardPage} />
                {/*<Route path="/vote/:question_id" component={QuestionVote} />
                <Route path="/questions/:question_id" component={QuestionResult} /> */}
            </Fragment>
        </Router>
    </Provider>,
    document.getElementById("root")
);
