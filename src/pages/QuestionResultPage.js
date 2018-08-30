import React, { Component } from "react";
import { Grid, Row, Col, Thumbnail, ProgressBar } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import * as actions from "../actions";

class QuestionResultPage extends Component {
    getPercentage = (current, total) => {
        if (total > 0) {
            return (current / total) * 100;
        } else {
            return 0;
        }
    };

    componentDidMount() {
        if (this.props.state && this.props.state.currentUser) {
            this.props.actions.getQuestions();
        } else {
            this.props.actions.setRequestedPage(this.props.history.location.pathname);
            this.props.history.push("/");
        }
    }

    render() {
        if (this.props.state && this.props.state.questions) {
            const { questions, users, currentUser } = this.props.state,
                currentQuestion = questions[this.props.match.params.questionId];
            if (currentQuestion) {
                const author = users[currentQuestion.author],
                    optionOneVotes = currentQuestion.optionOne.votes,
                    optionTwoVotes = currentQuestion.optionTwo.votes,
                    optionOneVotesLength = optionOneVotes.length,
                    optionTwoVotesLength = optionTwoVotes.length,
                    totalVotes = optionOneVotesLength + optionTwoVotesLength;
                return (
                    <Grid>
                        <Row>
                            <Col xs={6} md={4}>
                                <Thumbnail src={author.avatarURL} alt={author.name} />
                            </Col>
                            <Col xs={6} md={8}>
                                <h3>Asked by {author.name}</h3>
                                <p>Results:</p>
                                <ul>
                                    <li>
                                        {currentQuestion["optionOne"].text}{" "}
                                        {optionOneVotes.includes(currentUser.id)
                                            ? "(your answer)"
                                            : null}
                                        <ProgressBar
                                            now={this.getPercentage(
                                                optionOneVotesLength,
                                                totalVotes
                                            )}
                                            label={`${this.getPercentage(
                                                optionOneVotesLength,
                                                totalVotes
                                            )}%`}
                                        />
                                        {optionOneVotesLength} out of {totalVotes} votes
                                    </li>
                                    <li>
                                        {currentQuestion["optionTwo"].text}{" "}
                                        {optionTwoVotes.includes(currentUser.id)
                                            ? "(your answer)"
                                            : null}
                                        <ProgressBar
                                            now={this.getPercentage(
                                                optionTwoVotesLength,
                                                totalVotes
                                            )}
                                            label={`${this.getPercentage(
                                                optionTwoVotesLength,
                                                totalVotes
                                            )}%`}
                                        />
                                        {optionTwoVotesLength} out of {totalVotes} votes
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Grid>
                );
            } else {
                return <Redirect to="/404" />;
            }
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
)(QuestionResultPage);
