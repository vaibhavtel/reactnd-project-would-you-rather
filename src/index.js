import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import configureStore from "./utils/configureStore";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AddQuestionPage from "./pages/AddQuestionPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import QuestionVotePage from "./pages/QuestionVotePage";
import QuestionResultPage from "./pages/QuestionResultPage";
import NavbarComponent from "./components/NavbarComponent";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-theme.min.css";
import "./styles/css/index.css";

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
                <Route path="/vote/:questionId" component={QuestionVotePage} />
                <Route path="/questions/:questionId" component={QuestionResultPage} />
            </Fragment>
        </Router>
    </Provider>,
    document.getElementById("root")
);
