import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  reloadUser: false,
  balance:0
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
     setUser: (state, {payload}) => {
        state.user = payload
     },
     setReloadUser: (state, {payload}) => {
      state.reloadUser = payload
     },
     getBalance: (state, {payload}) => {
      state.balance = payload
     }
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setReloadUser, getBalance } = usersSlice.actions;

export default usersSlice.reducer;
