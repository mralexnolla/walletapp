/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { message } from "antd";
import { GetUserInfo } from "../apicalls/users";
import {useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import { setUser} from "../redux/userSlice";
import { showLoading, hideLoading } from "../redux/loadersSlice";
import DefaultLayout from "./DefaultLayout";



function ProtectedRoute(props) {
  
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user.user)
  
  
  
   const navigate = useNavigate()

   const getData = async () => {
     try {
      dispatch(showLoading())
       const response = await GetUserInfo();
       dispatch(hideLoading())
       if (response.success) {
         dispatch(setUser(response.data));
       }else{
        message.error(response.message)
        navigate("/login");
       }
     } catch (error) {
      dispatch(hideLoading())
       navigate("/login")
       message.error(error.message);
     }
   };
   
   useEffect(() => {
    if(localStorage.getItem("token")){
        if(!user){
            getData();
        }
       
    }else{
        navigate("/login")
    }
     
   }, []);

   

  return (
   user && <div>
       <DefaultLayout>
          {props.children}
       </DefaultLayout>
   </div>
  )
}

export default ProtectedRoute
