import * as constants from "../utils/constants";
// const initialState = {
//     users: {
//         yoda: {
//             id: "yoda",
//             name: "Yoda",
//             avatarURL: "/static/media/yoda.7ebe9141.png",
//             answers: {
//                 "8xf0y6ziyjabvozdd253nd": "optionOne",
//                 "6ni6ok3ym7mf1p33lnez": "optionOne",
//                 "am8ehyc8byjqgar0jgpub9": "optionTwo",
//                 "loxhs1bqm25b708cmbf3g": "optionTwo"
//             },
//             questions: [
//                 "8xf0y6ziyjabvozdd253nd",
//                 "am8ehyc8byjqgar0jgpub9"
//             ]
//         },
//         luke: {
//             id: "luke",
//             name: "Luke Skywalker",
//             avatarURL: "/static/media/luke.eb201f11.png",
//             answers: {
//                 "vthrdm985a262al8qx3do": "optionOne",
//                 "xj352vofupe1dqz9emx13r": "optionTwo"
//             },
//             questions: [
//                 "loxhs1bqm25b708cmbf3g",
//                 "vthrdm985a262al8qx3do"
//             ]
//         },
//         vader: {
//             id: "vader",
//             name: "Darth Vader",
//             avatarURL: "/static/media/vader.30444325.png",
//             answers: {
//                 "xj352vofupe1dqz9emx13r": "optionOne",
//                 "vthrdm985a262al8qx3do": "optionTwo",
//                 "6ni6ok3ym7mf1p33lnez": "optionOne"
//             },
//             questions: [
//                 "6ni6ok3ym7mf1p33lnez",
//                 "xj352vofupe1dqz9emx13r"
//             ]
//         }
//     },
//     currentUser: {
//         id: "luke",
//         name: "Luke Skywalker",
//         avatarURL: "/static/media/luke.eb201f11.png",
//         answers: {
//             "vthrdm985a262al8qx3do": "optionOne",
//             "xj352vofupe1dqz9emx13r": "optionTwo"
//         },
//         questions: [
//             "loxhs1bqm25b708cmbf3g",
//             "vthrdm985a262al8qx3do"
//         ]
//     }
// };

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
        case constants.ADD_QUESTION:
            return Object.assign({}, state, {
                ...state,
                questions: {
                    ...state.questions,
                    [action.question.id]: action.question
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
