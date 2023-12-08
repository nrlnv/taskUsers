import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { userSlice } from "./../bus/user/slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { currentUserSlice } from "../bus/currentUser/slice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);
const persistedCurrentUserReducer = persistReducer(
  persistConfig,
  currentUserSlice.reducer
);

export const store = configureStore({
  reducer: {
    userSlice: persistedReducer,
    currentUserSlice: persistedCurrentUserReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
