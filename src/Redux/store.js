import { createStore, applyMiddleware } from "redux";
// import thunk from 'redux-thunk';
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./Reducers";
const persistConfig = {
  key: "root",
  storage,
  // whitelist: ['walletEncrypted'],
};
// persistConfig.transforms = transforms;
const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store);
export { store, persistor };
