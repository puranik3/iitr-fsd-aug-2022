import { ADD_TO_CART } from "../actions/constants";

const initialState = {
    items: []
};

const cartReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case ADD_TO_CART:
            const newItems = [];
            let found = false;

            for( let i = 0; i < state.items.length; i++ ) {
                if( state.items[i].product === action.payload ) {
                    found = true;
                    newItems.push({
                        product: state.items[i].product,
                        quantity: state.items[i].quantity + 1
                    });
                } else {
                    newItems.push( state.items[i] );
                }
            }

            if( !found ) {
                newItems.push({
                    product: action.payload,
                    quantity: 1
                });
            }

            return {
                items: newItems
            };
        default:
            return state;
    }
};

export default cartReducer;