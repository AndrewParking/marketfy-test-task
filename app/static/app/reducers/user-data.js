import { ActionTypes } from '../constants';


const _default_state = {
    cash: 100000,
    items: []
};


const handleBuyItem = (state, data) => {

    /* Buy item action handling */

    if (!data.quantity) return state; // state is not being modified if quantity value is invalid.
    if (data.quantity <= 0) return state; // the same for negative values and zero.

    let index = state.items.findIndex(item => item.symbol === data.symbol),
        newState,
        warning;

    if (state.cash < data.quantity * data.pricePaid) return state;

    if (index === -1) { // handling the case when item is not already in the list
        newState = {
            ...state,
            cash: Math.round(state.cash - data.quantity * data.pricePaid, 2),
            items: state.items.concat(data)
        };
    } else {
        newState = {
            ...state,
            cash: Math.round(state.cash - data.quantity * data.pricePaid, 2),
            items: [
                ...state.items.slice(0, index),
                Object.assign({}, state.items[index], { quantity: state.items[index].quantity + data.quantity }),
                ...state.items.slice(index + 1)
            ]
        };
    }

    return newState;

};


const handleSellItem = (state, data) => {

    if (!data.quantity) return state;
    if (data.quantity <= 0) return state;

    let index = state.items.findIndex(item => item.symbol === data.symbol),
        newState;

    if (index === -1) return state; // we can't sell something we do not own
    let item = state.items[index];

    if (data.quantity > item.quantity) return;
    let newQuantity = item.quantity - data.quantity;

    if (newQuantity) { // if all the items of symbol have been sold
        newState = {
            ...state,
            cash: Math.round(state.cash + data.quantity * data.price, 2),
            items: [
                ...state.items.slice(0, index),
                { ...item, quantity: newQuantity },
                ...state.items.slice(index + 1)
            ],
        };
    } else {
        newState = {
            ...state,
            cash: Math.round(state.cash + data.quantity * data.price, 2),
            items: [...state.items.slice(0, index), ...state.items.slice(index + 1)]
        };
    }

    return newState;

}


export default function userDataReducer(state = _default_state, action) {

    switch (action.type) {

        case ActionTypes.BUY_ITEM:
            return handleBuyItem(state, action.data);

        case ActionTypes.SELL_ITEM:
            return handleSellItem(state, action.data);

        default:
            return state;
    }

}
