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

export const setCurrentUser = currentUser => {
    return {
        type: constants.CURRENT_USER,
        currentUser
    };
};
