import { axiosInstance } from "./index";

// verify receiver account
export const VerifyAccountApiCall = async (payload) => {
    try{
        const data = await axiosInstance.post("/api/transactions/verify-accout", payload);
        return data
    }catch (error){
        return `Failed verifiction: ${error.response.data}`
    }
}

// transfer funds
export const TransferFundsApiCall = async (payload) => {
    try {
        const data = await axiosInstance.post("/api/transactions/fund-transfer", payload);
        return data
    } catch (error) {
        return `Failed transfer: ${error.response.data}`
    }
}

// get all transaction for a user
export const GetUserTransactionsApiCall = async (sender, receiver) => {
    try {
        const data = await axiosInstance.post("/api/transactions/get-txn-by-users",
          {
            sender: sender,
            receiver: receiver,
          }
        );
        return data
    } catch (error) {
        return error.response.data
    }
}
