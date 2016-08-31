import { ActionTypes } from '../constants';


const handleUpdateInput = (state, value) => {

    const nval = Number.parseInt(value);

    // if (Number.isNaN(nval)) return state;
    if (nval <= 0) return state;

    return nval;

};


export default function inputValReducer(state = 0, action) {

    switch (action.type) {

        case ActionTypes.UPDATE_INPUT:
            return handleUpdateInput(state, action.value);

        default:
            return state;

    }

}
