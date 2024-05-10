import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import landingReducer from "./landingSlice";
import globalReducer from "./globalSlice";
import sidebarReducer from "./sidebarSlice";
import userReducer from "./userSlice";
import snackbarReducer from "./snackbarSlice";

export const store = configureStore({
  reducer: {
    globalSlice: globalReducer,
    landingSlice: landingReducer,
    sidebarSlice: sidebarReducer,
    userSlice: userReducer,
    snackbarSlice: snackbarReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;