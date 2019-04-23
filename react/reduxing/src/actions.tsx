
/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function addTodo(text:string) {

  return {
    type: ADD_TODO, 
    payload: { 
      text: text 
    } 
  };
}

export function toggleTodo(index: number) {

  return {
    type: TOGGLE_TODO, 
    payload: {
      index: index 
    }
  }
}

export function setVisibilityFilter(filter: any) {

  return { 
    type: SET_VISIBILITY_FILTER, 
    payload: {
      filter: filter
    }
  }
}