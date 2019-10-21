import { Dispatch } from 'redux';

export const loggingMiddleware = (store: any) => (next: Dispatch) => (action: any) => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}