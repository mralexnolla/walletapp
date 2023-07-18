import { axiosInstance } from "./index";

//loging user

export const LoginUserApiCall = async (payload) => {
    try {
        const {data} = await axiosInstance.post('/api/users/login', payload);
        return data
    } catch (error) {
        return `Issue with LOGING : ${error.response.data}`
    }
}

// register user
export const RegisterUserApiCall = async (payload) => {
  try {
    const {data} = await axiosInstance.post("/api/users/register", payload);
    return data;
  } catch (error) {
    return  error.response.data ;
  }
};
