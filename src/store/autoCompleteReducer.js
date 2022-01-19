import { LOAD_AUTOCOMPLETE_DATA,UPDATE_DATA } from './actions';

const autoCompleteReducer = (state = [], action) => {
    switch (action.type) {
        case LOAD_AUTOCOMPLETE_DATA: {
          
            return action.payload;
        }
        case UPDATE_DATA: {
          
            return [...state, action.payload];
        }
        default: {
            return [];
        }
    }
};
export default autoCompleteReducer;
