import React, { Component } from "react";
import { Grid, Row, Col, Thumbnail, Button, FormGroup, Radio } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";

class QuestionVotePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: ""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleButtonSubmit = () => {
        const { currentUser } = this.props.state,
            questionId = this.props.match.params.questionId.substring(1),
            data = {};
        data.qid = questionId;
        data.authedUser = currentUser.id;
        data.answer = this.state.option;
        this.props.actions.answerQuestion(data);
        this.props.history.push(`/questions/:${questionId}`);
    };

    componentDidMount() {
        if (this.props.state && this.props.state.currentUser) {
        } else {
            this.props.history.push("/");
        }
    }

    render() {
        if (this.props.state && this.props.state.questions) {
            const { questions, users } = this.props.state,
                currentQuestion = questions[this.props.match.params.questionId.substring(1)],
                author = users[currentQuestion.author];
            return (
                <Grid>
                    <Row>
                        <Col xs={6} md={4}>
                            <Thumbnail src={author.avatarURL} alt={author.name} />
                        </Col>
                        <Col xs={6} md={8}>
                            <h3>{author.name} asks:</h3>
                            <p>Would you rather</p>
                            <FormGroup>
                                <Radio name="option" value="optionOne" onChange={this.handleChange}>
                                    {currentQuestion["optionOne"].text}
                                </Radio>
                                <Radio name="option" value="optionTwo" onChange={this.handleChange}>
                                    {currentQuestion["optionTwo"].text}
                                </Radio>
                            </FormGroup>
                            {this.state.option ? (
                                <Button bsStyle="success" onClick={this.handleButtonSubmit}>
                                    Submit
                                </Button>
                            ) : null}
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
)(QuestionVotePage);
