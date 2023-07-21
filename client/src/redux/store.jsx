import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import loadersReducer from "./loadersSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
    loading: loadersReducer,
  },
});
