import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import { createLogger } from "redux-logger";
import allReducers from "./slices";

const rootReducer = combineReducers(allReducers);
const logger = createLogger();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export default store;
