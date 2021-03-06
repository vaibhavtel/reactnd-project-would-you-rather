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

export const answerQuestion = answerData => async dispatch => {
    _saveQuestionAnswer(answerData).then(() =>
        dispatch({
            type: constants.ANSWER_QUESTION,
            answerData
        })
    );
};

export const setCurrentUser = currentUser => {
    return {
        type: constants.CURRENT_USER,
        currentUser
    };
};

export const setRequestedPage = requestedPage => {
    return {
        type: constants.SET_REQUESTED_PAGE,
        requestedPage
    };
};

export const clearRequestedPage = () => {
    return {
        type: constants.CLEAR_REQUESTED_PAGE
    };
};

export const logout = () => {
    return {
        type: constants.LOGOUT
    };
};
