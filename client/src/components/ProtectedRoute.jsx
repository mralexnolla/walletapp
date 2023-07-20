/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { message } from "antd";
import { GetUserInfo } from "../apicalls/users";
import {useNavigate} from "react-router-dom"


function ProtectedRoute(props) {
   const [userdata, setUserData] = useState(null);

   const navigate = useNavigate()

   const getData = async () => {
     try {
       const response = await GetUserInfo();
       if (response.success) {
         setUserData(response.data);
       }else{
        message.error(response.message)
       }
     } catch (error) {
       navigate("/login")
       message.error(error.message);
     }
   };
   
   useEffect(() => {
    if(localStorage.getItem("token")){
        if(!userdata){
            getData();
        }
       
    }else{
        navigate("/login")
    }
     
   }, []);

  return (
    <div>{props.children}</div>
  )
}

export default ProtectedRoute
