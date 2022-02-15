/* eslint-disable import/no-anonymous-default-export */
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "./reducers/auth";
import partners from "./reducers/partners";
import pages from "./reducers/pages";
import insights from "./reducers/insights";
import services from "./reducers/services";
import menuCategory from "./reducers/menuCategory";
import caseStudy from "./reducers/caseStudy";
import clients from "./reducers/clients";
import roles from "./reducers/roles";

const rootReducer = combineReducers({
  auth,
  partners,
  pages,
  insights,
  services,
  menuCategory,
  caseStudy,
  clients,
  roles,
});

const persistConfig = {
  key: "cloudfift",
  storage,
  whitelist: ["menuCategory"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { persistor, store };
