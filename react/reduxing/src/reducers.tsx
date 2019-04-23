
import { combineReducers } from 'redux'
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'
import { IAction } from './interface';

const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action: IAction): any {

  switch (action.type) {

    case SET_VISIBILITY_FILTER:

      return action.payload.filter

    default:

      return state
  }
}

function todos(state = [], action: IAction): any {

  console.log(state);

  switch (action.type) {

    case ADD_TODO:

      return [
        ...state,
        {
          id: state.length,
          text: action.payload.text,
          completed: false
        }
      ];

    case TOGGLE_TODO:

      return state.map((todo:any, index) => {

        if (index === action.payload.index) {

          return Object.assign(
            {}, 
            todo, 
            {
              completed: !todo.completed
            }
          );
        }
        return todo
      });

    default:

      return state;
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp