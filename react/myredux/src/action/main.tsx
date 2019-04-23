
/*
 * actions
 */

export const INIT = 'INIT';
export function init(text:string) {

  return {
    type: INIT, 
    payload: { 
      text: text 
    } 
  };
}

export const RESET = 'RESET';
export function reset(text:string) {

  return {
    type: RESET, 
    payload: { 
      text: text 
    } 
  };
}