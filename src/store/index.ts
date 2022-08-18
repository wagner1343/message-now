/* eslint-disable no-unused-vars */
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { ENABLE_REDUX_DEV_TOOLS } from "src/config/redux";
import rootReducer from "src/store/rootReducer";

const store = configureStore({
  reducer: rootReducer,
  devTools: ENABLE_REDUX_DEV_TOOLS,
  middleware: getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof rootReducer>;

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected => useReduxSelector(selector, equalityFn);

export const useDispatch = () => useReduxDispatch();

export default store;
