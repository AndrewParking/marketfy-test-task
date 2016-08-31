import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import symbol from './reducers/symbol';
import userData from './reducers/user-data';
import error from './reducers/errors';
import inputVal from './reducers/inputVal';
import { LS_KEY } from './constants';


/*

======= App state structure: =======

{
    inputVal: number,
    symbolData: {
        symbol: string,
        bidPrice: number,
        askPrice: number,
    },
    error: string,
    userData: {
        cash: number,
        items: [
            {
                sumbol: string,
                name: string,
                quantity: number,
                pricePaid: number
            }
        ]
    }
}

====================================

*/

const getDefaultState = () => {
    /*
    Here we get initial state from local storage. If there is no the one there, we explicitly return `undefined`
    in order to allow initial state to be composed from reducers' initial states.
    */
    let savedData = localStorage.getItem(LS_KEY);
    return savedData ? JSON.parse(savedData) : undefined;
};


let store = createStore(
    combineReducers({ symbol, userData, error, inputVal }),
    getDefaultState(),
    applyMiddleware(thunkMiddleware, createLogger())
);

store.subscribe(() => localStorage.setItem(LS_KEY, JSON.stringify(store.getState()))); // saving state on each action dispatch


export default store;
