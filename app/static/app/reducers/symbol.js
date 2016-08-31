import { ActionTypes } from '../constants';


const _default_state = {};


export default function symbolReducer(state = _default_state, action) {

    switch (action.type) {

        case ActionTypes.GET_SYMBOL_SUCCESS:
            return action.data;

        default:
            return state;

    }

}
