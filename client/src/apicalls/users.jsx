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

//get user info
export const GetUserInfo = async () => {
    try {
      const { data } = await axiosInstance.post("/api/users/get-user-info");
      return data
    } catch (error) {
      return error.response.data
    }
}

// get all users
export const GetAllUsers = async () => {
  try {
    const data = await axiosInstance.get("/api/users/get-all-users")
    return data
  } catch (error) {
    return error.response.data
  }
}

//update user verified status

export const UpdateUserVerifiedStatus = async (payload) => {
  try {
    const data = await axiosInstance.post("/api/users/update-users-verified-status", payload)
    return data
  } catch (error) {
    return error.response.data;
  }
}

