import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const loadersSlice = createSlice({
  name: "loaders",
  initialState,
  reducers: {
    showLoading: (state) => {
        state.loading = true;
    },
    hideLoading: (state) => {
        state.loading = false;
    }
    
  },
});

// Action creators are generated for each case reducer function
export const { showLoading, hideLoading } = loadersSlice.actions;

export default loadersSlice.reducer;
