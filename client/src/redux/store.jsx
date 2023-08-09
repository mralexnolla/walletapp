import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import loadersReducer from "./loadersSlice";
import transactionSlice from "./transactionSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
    loading: loadersReducer,
    requestCount: transactionSlice,
  },
});
