
export interface IAction {
  type: string,
  payload: any,
  error?: boolean,
  meta?: any
}