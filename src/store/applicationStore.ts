import {
  applyMiddleware,
  createStore,
  DeepPartial,
  StoreEnhancer,
  StoreCreator
} from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  reduxErrorHandlingMiddleware,
  reduxApiErrorHandlingMiddleware
} from "./customMiddleware/reduxErrorHandling";

export default function configureStore(
  preloadedState?: DeepPartial<{}>
): StoreCreator {
  const middlewares = [
    thunk,
    reduxErrorHandlingMiddleware,
    reduxApiErrorHandlingMiddleware
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers: StoreEnhancer<{}> = composeWithDevTools(
    ...enhancers
  );

  const applicationStore = createStore(
    rootReducer,
    preloadedState,
    composedEnhancers
  );

  return applicationStore;
}
