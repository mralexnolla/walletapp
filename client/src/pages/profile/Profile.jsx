/* eslint-disable no-unused-vars */
import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';

const Profile = () => {
  const [uploadFile, setUploadFile] = useState()
  const [userImage, setUserImage] = useState([])

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

  const imageUpload = async () => {
    try {

      const formData = new FormData();
      formData.append("email", user.email)
      formData.append("image", uploadFile);

      const response = await axios.post(`http://localhost:8000/api/uploads/imageUploads`, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      });

      if(response.data.success){
        message.success(response.data.message)
      }else{
        message.error(response.data.message);
      }

        
    } catch (error) {
      console.error(error)
      message.error(error.message);
    }
  }

  const getImage = async () => {
    
    try {
      const response = await axios.get(`http://localhost:8000/api/uploads/getImage`,{
        params : {
          email: user.email
        }
      })
      
      if(response.data.success){
        setUserImage(response.data.data);
      }


    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getImage()
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    imageUpload();
  }

  //console.log(userImage);

  return (
    <div>
      <PageTitle title="Profile" />
      <div className="flex">
        <div className="w-50">
          <div className="card p-2 mt-3 w-75 br-3 flex flex-col gap-1 uppercase">
            <div className="flex justify-center">
              <div className="w-50 flex justify-end mr-2">
                <h1 className="text-md">First Name</h1>
              </div>
              <div className="w-50 flex justify-start">
                <h1 className="text-md">{user.firstName}</h1>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-50 flex justify-end mr-2">
                <h1 className="text-md">Last Name</h1>
              </div>
              <div className="w-50 flex justify-start">
                <h1 className="text-md">{user.lastName}</h1>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-50 flex justify-end mr-2">
                <h1 className="text-md">Mobile</h1>
              </div>
              <div className="w-50 flex justify-start">
                <h1 className="text-md">{user.phone}</h1>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-50 flex justify-end mr-2">
                <h1 className="text-md">ID type</h1>
              </div>
              <div className="w-50 flex justify-start">
                <h1 className="text-md">{user.idType}</h1>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-50 flex justify-end mr-2">
                <h1 className="text-md">ID Number</h1>
              </div>
              <div className="w-50 flex justify-start">
                <h1 className="text-md">{user.idNumber}</h1>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-50 flex justify-end mr-2">
                <h1 className="text-md">Tax Id</h1>
              </div>
              <div className="w-50 flex justify-start">
                <h1 className="text-md">{user.tin}</h1>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-50 flex justify-end mr-2">
                <h1 className="text-md">Admin</h1>
              </div>
              <div className="w-50 flex justify-start">
                <h1 className="text-md">
                  {user.isAdmin === true ? "Admine" : "Users"}
                </h1>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-50 flex justify-end mr-2">
                <h1 className="text-md">Verified</h1>
              </div>
              <div className="w-50 flex justify-start">
                <h1 className="text-md">
                  {user.isVerified === true ? "Verified" : "Not Verified"}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="w-50 flex flex-col">
          <div className=" p-2 mt-3 w-75 br-3 w-75 flex justify-end">
            {userImage === null
              ? ""
              : userImage.map((item) => {
                  console.log("this is ", item.image);
                  return (
                    <div key={item._id} className="w-50 flex justify-end mt-2">
                      <img
                        src={`../../../public/images/${item.image}`}
                        alt="profile image"
                        height={200}
                        width={200}
                      />
                    </div>
                  );
                })}
          </div>

          <div className="flex justify-start mt-1">
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  onChange={(e) => setUploadFile(e.target.files[0])}
                  className="primary-outlined-btn"
                />
              </div>

              <div className="flex mt-1">
                <input
                  type="submit"
                  value="Upload"
                  className="primary-contained-btn"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile
