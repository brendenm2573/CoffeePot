import {
    ORDER_CHANGE,
    ORDER_CREATE,
    ORDER_NAME_CHANGE,
    ORDER_INSTRUCTION_CHANGE,
    ORDER_ID_CHANGE
} from '../actions/types';

const INITIAL_STATE = {
    location: '',
    selectedPlace: null,
    order: '',
    drinkName: '',
    specialInstructions: '',
    orderID: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ORDER_NAME_CHANGE:
          return { ...state, drinkName: action.payload };
        case ORDER_INSTRUCTION_CHANGE:
            return { ...state, specialInstructions: action.payload };
        case ORDER_CHANGE:
          return { ...state, order: action.payload };
        case ORDER_CREATE:
            return INITIAL_STATE;
        case ORDER_ID_CHANGE:
            return { ...state, orderID: action.payload };
        default:
            return state;
    }
};
