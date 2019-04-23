
import { combineReducers } from 'redux'
import { 
  INIT,
  RESET
} from '../action/main'

import { IAction } from '../interface/action';

function main(state = {}, action: IAction): any {

  switch (action.type) {

    case INIT:

      console.log(`INIT ${action.payload.text}`);

      return Object.assign(
        {}, 
        state, 
        {
          reset: false,
          reason: action.payload.text
        }
      );

    case RESET:

      console.log(`RESET ${action.payload.text}`);

      return Object.assign(
        {}, 
        state, 
        {
          reset: true,
          reason: action.payload.text
        }
      );

    default:

      return state
  }
}

const mainReducer = combineReducers({
  main
});

export default mainReducer