import React, { Component } from "react";
import { Grid, Row, Col, FormGroup, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";

class AddQuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: "",
            optionOneText: "",
            optionTwoText: ""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleButtonClick = () => {
        const { optionOneText, optionTwoText } = this.state;
        if (optionTwoText && optionOneText) {
            this.props.actions.addQuestion(this.state);
            this.props.history.push("/home");
        }
    };

    componentDidMount() {
        if (this.props.state && this.props.state.currentUser) {
            this.setState({
                author: this.props.state.currentUser.id
            });
        } else {
            this.props.actions.setRequestedPage(this.props.history.location.pathname);
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xsOffset={4} xs={4}>
                        <h4 className="text-center">Would You Rather</h4>
                        <FormGroup>
                            <FormControl
                                type="text"
                                name="optionOneText"
                                value={this.state.optionOneText}
                                placeholder="Enter option one"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormControl
                                type="text"
                                name="optionTwoText"
                                value={this.state.optionTwoText}
                                placeholder="Enter option two"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <div className="text-center">
                            <Button bsStyle="success" onClick={this.handleButtonClick}>
                                Add question
                            </Button>
                        </div>
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
)(AddQuestionPage);
