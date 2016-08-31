import { ActionTypes } from '../constants';


export default function errorReducer(state = '', action) {

    switch (action.type) {

        case ActionTypes.GET_SYMBOL_ERROR:
            return `Symbol '${action.symbol}' does not exist`;

        case ActionTypes.SKIP_ERROR:
            return '';

        default:
            return state;

    }

}
