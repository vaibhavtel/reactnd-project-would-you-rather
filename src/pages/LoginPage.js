import React, { Component } from "react";
import { Grid, Row, Col, FormControl, Button, ControlLabel, FormGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: "yoda"
        };
    }

    getUsers = () => {
        if (this.props.state) {
            const { users } = this.props.state;
            if (users) {
                return Object.keys(users).map(user => {
                    return (
                        <option key={users[user].id} value={users[user].id}>
                            {users[user].name}
                        </option>
                    );
                });
            }
        }
    };

    handleChange = event => {
        this.setState({ selectedUser: event.target.value });
    };

    handleButtonClick = () => {
        const { users, requestedPage } = this.props.state,
            { selectedUser } = this.state;
        this.props.actions.setCurrentUser(users[selectedUser]);
        if (requestedPage) {
            this.props.history.push(requestedPage);
            this.props.actions.clearRequestedPage();
        } else {
            this.props.history.push("/home");
        }
    };

    componentDidMount() {
        if (this.props.state && this.props.state.users) {
        } else {
            this.props.actions.getUsers();
        }
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xsOffset={4} xs={4}>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Select</ControlLabel>
                            <FormControl componentClass="select" onChange={this.handleChange}>
                                {this.getUsers()}
                            </FormControl>
                        </FormGroup>
                        <div className="text-center">
                            <Button bsStyle="success" onClick={this.handleButtonClick}>
                                Login
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
)(LoginPage);
