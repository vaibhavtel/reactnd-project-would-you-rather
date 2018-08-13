import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as actions from "../actions";

class NavbarComponent extends Component {
    handleLogout = () => {
        this.props.actions.logout();
        this.props.history.push("/");
    };

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <a href="/" className="navbar-brand">
                            Would You Rather
                        </a>
                    </div>
                    {this.props.state && this.props.state.currentUser ? (
                        <ul className="nav navbar-nav">
                            <li>
                                <NavLink to="/home" activeClassName="active">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/add" activeClassName="active">
                                    Add New Question
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/leaderboard" activeClassName="active">
                                    Leaderboard
                                </NavLink>
                            </li>
                            <li onClick={this.handleLogout}>
                                <a>Logout</a>
                            </li>
                            <li>
                                <a>Welcome {this.props.state.currentUser.name}</a>
                            </li>
                        </ul>
                    ) : null}
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(NavbarComponent)
);
