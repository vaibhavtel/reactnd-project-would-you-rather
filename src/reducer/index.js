import * as constants from "../utils/constants";

const reducer = (state = null, action) => {
    switch (action.type) {
        case constants.GET_USERS:
            return Object.assign({}, state, {
                ...state,
                users: action.users
            });
        case constants.CURRENT_USER:
            return Object.assign({}, state, {
                ...state,
                currentUser: action.currentUser
            });
        default:
            return state;
    }
};

export default reducer;
