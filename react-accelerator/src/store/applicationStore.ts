import {
  applyMiddleware,
  createStore,
  DeepPartial,
  StoreEnhancer
} from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore(preloadedState?: DeepPartial<{}>) {
  const middlewares = [thunk];
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
