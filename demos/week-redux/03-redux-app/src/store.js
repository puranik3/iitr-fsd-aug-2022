import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import counterReducer from './reducers/counter';
import profileReducer from './reducers/profile';
import cartReducer from './reducers/cart';

// "root state"
/*
    {
        counter: {
            value: 0
        },
        profile: {
            name: ''
        },
        cart: {
            items: [
                {
                    producet: {...},
                    quantity: 2
                },
                ...
            ]
        }
    }
*/
const store = createStore( 
    combineReducers({
        counter: counterReducer,
        profile: profileReducer,
        cart: cartReducer
    }),
    composeWithDevTools( applyMiddleware() )
);

export default store;