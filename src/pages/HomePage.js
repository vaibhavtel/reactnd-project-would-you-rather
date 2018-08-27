import React, { Component } from "react";
import { Grid, Row, Col, Tabs, Tab, Thumbnail, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";

class HomePage extends Component {
    handleButtonVote = questionId => {
        this.props.history.push(`/vote/:${questionId}`);
    };

    handleButtonPoll = questionId => {
        this.props.history.push(`/questions/:${questionId}`);
    };

    getUnansweredQuestions = () => {
        if (this.props.state && this.props.state.questions) {
            const { questions, users } = this.props.state,
                { answers } = users[this.props.state.currentUser.id],
                unAnsweredQuestions = Object.keys(questions)
                    .filter(question => !Object.keys(answers).includes(question))
                    .sort((id1, id2) => questions[id1].timestamp < questions[id2].timestamp);
            if (unAnsweredQuestions.length) {
                return unAnsweredQuestions.map(unAnsweredQuestion => {
                    const currentQuestion = questions[unAnsweredQuestion],
                        author = users[currentQuestion.author];
                    return (
                        <Col xs={6} md={4} key={unAnsweredQuestion}>
                            <Thumbnail src={author.avatarURL} alt={author.name}>
                                <h3 className="text-center">{author.name} asks:</h3>
                                <p>Would you rather</p>
                                <ul>
                                    <li>{currentQuestion["optionOne"].text}</li>
                                    <li>{currentQuestion["optionTwo"].text}</li>
                                </ul>
                                <div className="text-center">
                                    <Button
                                        bsStyle="success"
                                        onClick={() => this.handleButtonVote(unAnsweredQuestion)}
                                    >
                                        Vote
                                    </Button>
                                </div>
                            </Thumbnail>
                        </Col>
                    );
                });
            }
        }
    };

    getAnsweredQuestions = () => {
        if (this.props.state && this.props.state.currentUser && this.props.state.questions) {
            const { questions, users } = this.props.state,
                { answers } = users[this.props.state.currentUser.id];
            if (answers) {
                return Object.keys(answers).map(answer => {
                    const currentQuestion = questions[answer],
                        option = answers[answer],
                        author = users[currentQuestion.author];
                    return (
                        <Col xs={6} md={4} key={answer}>
                            <Thumbnail src={author.avatarURL} alt={author.name}>
                                <h3 className="text-center">{author.name} asks:</h3>
                                <p>Would you rather</p>
                                <p>{currentQuestion[option].text}</p>
                                <div className="text-center">
                                    <Button
                                        bsStyle="success"
                                        onClick={() => this.handleButtonPoll(answer)}
                                    >
                                        View Poll
                                    </Button>
                                </div>
                            </Thumbnail>
                        </Col>
                    );
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
        if (this.props.state && this.props.state.questions) {
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
        } else {
            return <h5 className="text-center">Loading ...</h5>;
        }
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
