import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
     setUser: (state, {payload}) => {
        state.user = payload
     }
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;
