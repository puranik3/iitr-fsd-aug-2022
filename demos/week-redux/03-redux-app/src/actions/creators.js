import {
    ADD_TO_CART,
    DECREMENT,
    INCREMENT,
    UPDATE_NAME
} from './constants';

// action creators
const decrement = () => {
    return {
        type: DECREMENT
    };
};

const increment = () => {
    return {
        type: INCREMENT
    };
};

const updateName = ( name ) => {
    return {
        type: UPDATE_NAME,
        payload: name
    };
};

const addToCart = ( product ) => {
    return {
        type: ADD_TO_CART,
        payload: product
    };
}

export {
    decrement,
    increment,
    updateName,
    addToCart
};