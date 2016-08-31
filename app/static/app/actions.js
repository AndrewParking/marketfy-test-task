import { ActionTypes, ERROR_DISPLAY_DURATION } from './constants';


const _getSymbolRequest = symbol => ({
    type: ActionTypes.GET_SYMBOL_REQUEST,
    symbol: symbol
});

const _getSymbolSuccess = (symbol, data) => ({
    type: ActionTypes.GET_SYMBOL_SUCCESS,
    data: data
});

const _getSymbolFail = (symbol, errors) => ({
    type: ActionTypes.GET_SYMBOL_ERROR,
    symbol: symbol,
    errors: errors
});


export function skipError() {
    return { type: ActionTypes.SKIP_ERROR };
}


export function getSymbol(symbol) {
    return dispatch => {
        dispatch(_getSymbolRequest(symbol));
        fetch(`/items/${symbol}`)
            .then(response => response.json())
            .then(json => dispatch(_getSymbolSuccess(symbol, json)))
            .catch(errors => {
                dispatch(_getSymbolFail(symbol, errors));
                setTimeout(() => dispatch(skipError()), ERROR_DISPLAY_DURATION);
            });
    };
}


export function buyItem(symbol, name, pricePaid, quantity) {
    return {
        type: ActionTypes.BUY_ITEM,
        data: { symbol, name, pricePaid, quantity }
    };
}


export function sellItem(symbol, name, price, quantity) {
    return {
        type: ActionTypes.SELL_ITEM,
        data: { symbol, name, price, quantity }
    };
}


export function updateInput(value) {
    return {
        type: ActionTypes.UPDATE_INPUT,
        value: value
    };
}
