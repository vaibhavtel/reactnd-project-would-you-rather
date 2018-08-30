import React, { Component } from "react";
import { Grid, Row, Col, Thumbnail } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";

class LeaderboardPage extends Component {
    getSortedUsersList = () => {
        if (this.props.state && this.props.state.users) {
            const { users } = this.props.state,
                userList = {};
            let sortedUsersList;
            Object.keys(users).forEach(user => {
                const currentUser = users[user];
                userList[currentUser.id] =
                    currentUser.questions.length + Object.keys(currentUser.answers).length;
            });
            sortedUsersList = Object.keys(userList).sort((a, b) => userList[b] - userList[a]);
            return sortedUsersList.map(user => {
                const currentUser = users[user];
                return (
                    <Col xs={6} md={4} key={currentUser.id}>
                        <Thumbnail src={currentUser.avatarURL} alt={currentUser.name}>
                            <h3 className="text-center">{currentUser.name}</h3>
                            <p>Number of questions asked: {currentUser.questions.length}</p>
                            <p>
                                Number of questions answered:{" "}
                                {Object.keys(currentUser.answers).length}
                            </p>
                        </Thumbnail>
                    </Col>
                );
            });
        } else {
            this.props.actions.getUsers();
        }
    };

    componentDidMount() {
        if (this.props.state && this.props.state.currentUser) {
        } else {
            this.props.actions.setRequestedPage(this.props.history.location.pathname);
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <Grid>
                <Row>
                    <h2 className="text-center">LeaderboardPage</h2>
                    {this.getSortedUsersList()}
                </Row>
            </Grid>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeaderboardPage);
