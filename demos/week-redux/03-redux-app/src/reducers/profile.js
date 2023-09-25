import { UPDATE_NAME } from "../actions/constants";

const initialState = {
    name: ''
};

const profileReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case UPDATE_NAME:
            return {
                ...state,
                name: action.payload
            };
        default:
            return state;
    }
};

export default profileReducer;