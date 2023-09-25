import {
    DECREMENT,
    INCREMENT
} from '../actions/constants';

const initialState = {
    value: 0
};

const counterReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case DECREMENT:
            return {
                ...state,
                value: state.value - 1
            };
        case INCREMENT:
            return {
                ...state,
                value: state.value + 1
            };
        default:
            return state;
    }
};

export default counterReducer;