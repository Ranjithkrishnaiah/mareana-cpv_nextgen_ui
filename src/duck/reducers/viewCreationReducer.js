import {FUNCTION_TEXT,MOLECULE_ID} from '../types/types';

const initState = {
  textName:'',
  molecule_id:''
};

export default (state = initState, action) => {
    switch (action.type) {
      case FUNCTION_TEXT:
        return { ...state, textName: action.payload };
        case MOLECULE_ID:
        return { ...state, molecule_id: action.payload }
      default:
        return state;
    }
  };