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