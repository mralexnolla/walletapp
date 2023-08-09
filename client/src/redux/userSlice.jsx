import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  reloadUser: false
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
     }
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setReloadUser } = usersSlice.actions;

export default usersSlice.reducer;
