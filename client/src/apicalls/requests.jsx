import { axiosInstance } from "./index";

// get all request for a user
export const GetRequest = async (senderEmail, receiverEmail) => {
    try {
        const data = await axiosInstance.post("/api/requests/get-requests", {
          sender: senderEmail,
          receiver: receiverEmail,
        });
        return data
    } catch (error) {
       return error.response.data 
    }
}

//send a request to another user
export const SendRequest = async (payload) => {
    try {
        const data = await axiosInstance.post("/api/requests/send-request", payload)
        return data
    } catch (error) {
        return error.response.data
    }
}