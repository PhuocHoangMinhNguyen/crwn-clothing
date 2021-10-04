import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [logger]; // ? Add more middleware in the array when needed

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
