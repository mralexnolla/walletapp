import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  requestCount: 0,
};

export const transactionSlice = createSlice({
  name: "requestCounter",
  initialState,
  reducers: {
    pendingRequestCount: (state, {payload}) => {
      state.requestCount = payload
    } 
  },
});

export const { pendingRequestCount } = transactionSlice.actions;

export default transactionSlice.reducer;