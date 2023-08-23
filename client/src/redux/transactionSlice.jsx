import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  requestCount: 0,
  income: 0,
  expense: 0,
  depositeCount: 0,
  debitTransferCount: 0,
  creditTransferCount: 0,
  sendRequestCount: 0,
  receivedRequestCount: 0
};

export const transactionSlice = createSlice({
  name: "requestCounter",
  initialState,
  reducers: {
    pendingRequestCount: (state, {payload}) => {
      state.requestCount = payload
    },
    sumIncome: (state, {payload}) => {
      state.income = payload
    },
    sumExpense: (state, {payload}) => {
      state.expense = payload
    },
    numberOfDeposites: (state, {payload}) => {
      state.depositeCount = payload
    },
    numberOfDebitTransfer: (state, {payload}) => {
      state.debitTransferCount = payload
    },
    numberOfCreditTransfer: (state, {payload}) => {
      state.creditTransferCount = payload
    },
    numberOfSendRequest: (state, {payload}) => {
      state.sendRequestCount = payload
    },
    numberOfReceivedRequest: (state, {payload}) => {
      state.receivedRequestCount = payload
    },
  },
});

export const {
  pendingRequestCount,
  sumIncome,
  sumExpense,
  numberOfDeposites,
  numberOfDebitTransfer,
  numberOfCreditTransfer,
  numberOfSendRequest,
  numberOfReceivedRequest,
} = transactionSlice.actions;

export default transactionSlice.reducer;