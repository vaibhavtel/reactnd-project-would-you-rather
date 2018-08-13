import * as constants from "../utils/constants";
import { _getQuestions, _getUsers, _saveQuestionAnswer, _saveQuestion } from "../utils/_data.js";

export const getUsers = () => async dispatch => {
    _getUsers().then(users =>
        dispatch({
            type: constants.GET_USERS,
            users
        })
    );
};

export const getQuestions = () => async dispatch => {
    _getQuestions().then(questions =>
        dispatch({
            type: constants.GET_QUESTIONS,
            questions
        })
    );
};

export const addQuestion = questionData => async dispatch => {
    _saveQuestion(questionData).then(question =>
        dispatch({
            type: constants.ADD_QUESTION,
            question
        })
    );
};

export const setCurrentUser = currentUser => {
    return {
        type: constants.CURRENT_USER,
        currentUser
    };
};

export const logout = () => {
    return {
        type: constants.LOGOUT
    };
};
