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
export const TransferFunds = async (payload) => {
    try {
        const data = await axiosInstance.post("/api/transactions/fund-transfer", payload);
        return data
    } catch (error) {
        return `Failed transfer: ${error.response.data}`
    }
}