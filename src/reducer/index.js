import * as constants from "../utils/constants";

const reducer = (state = null, action) => {
    switch (action.type) {
        case constants.GET_USERS:
            return Object.assign({}, state, {
                ...state,
                users: action.users
            });
        case constants.GET_QUESTIONS:
            return Object.assign({}, state, {
                ...state,
                questions: action.questions
            });
        case constants.CURRENT_USER:
            return Object.assign({}, state, {
                ...state,
                currentUser: action.currentUser
            });
        case constants.SET_REQUESTED_PAGE:
            return Object.assign({}, state, {
                ...state,
                requestedPage: action.requestedPage
            });
        case constants.CLEAR_REQUESTED_PAGE:
            return Object.assign({}, state, {
                ...state,
                requestedPage: null
            });
        case constants.ADD_QUESTION:
            const { question } = action;
            return Object.assign({}, state, {
                ...state,
                questions: {
                    ...state.questions,
                    [question.id]: question
                },
                users: {
                    ...state.users,
                    [question.author]: {
                        ...state.users[question.author],
                        questions: state.users[question.author].questions.concat([question.id])
                    }
                }
            });
        case constants.ANSWER_QUESTION:
            const { authedUser, qid, answer } = action.answerData;
            return Object.assign({}, state, {
                ...state,
                questions: {
                    ...state.questions,
                    [qid]: {
                        ...state.questions[qid],
                        [answer]: {
                            ...state.questions[qid][answer],
                            votes: state.questions[qid][answer].votes.concat([authedUser])
                        }
                    }
                },
                users: {
                    ...state.users,
                    [authedUser]: {
                        ...state.users[authedUser],
                        answers: {
                            ...state.users[authedUser].answers,
                            [qid]: answer
                        }
                    }
                }
            });
        case constants.LOGOUT:
            return Object.assign({}, state, {
                ...state,
                currentUser: null
            });
        default:
            return state;
    }
};

export default reducer;
