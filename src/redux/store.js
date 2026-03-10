import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [logger]; // ? Add more middleware in the array when needed

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

const storeExports = { store, persistor };
export default storeExports;
