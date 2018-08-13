import React, { Component } from "react";
import { Grid, Row, Col, Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";

class HomePage extends Component {
    getUnansweredQuestions = () => {
        if (this.props.state && this.props.state.questions) {
            const { questions } = this.props.state,
                { answers } = this.props.state.currentUser,
                unAnsweredQuestions = Object.keys(questions).filter(
                    question => !Object.keys(answers).includes(question)
                );
            if (unAnsweredQuestions.length) {
                return unAnsweredQuestions.map(unAnsweredQuestion => {
                    return <p key={unAnsweredQuestion}>{unAnsweredQuestion}</p>;
                });
            }
        }
    };

    getAnsweredQuestions = () => {
        if (this.props.state && this.props.state.currentUser) {
            const { answers } = this.props.state.currentUser;
            if (answers) {
                return Object.keys(answers).map(answer => {
                    return <p key={answer}>{answer}</p>;
                });
            }
        }
    };

    componentDidMount() {
        if (this.props.state && this.props.state.currentUser) {
            this.props.actions.getQuestions();
        } else {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Tabs defaultActiveKey={1} id="questionsList">
                            <Tab eventKey={1} title="Unanswered">
                                {this.getUnansweredQuestions()}
                            </Tab>
                            <Tab eventKey={2} title="Answered">
                                {this.getAnsweredQuestions()}
                            </Tab>
                        </Tabs>
                    </Col>
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
)(HomePage);
