/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Tabs, Table,  message } from "antd";
import PageTitle from '../../components/PageTitle'
import { useState, useEffect } from "react";
import RequestModal from './RequestModal'
import { GetRequest, UpdateRequestStatus } from '../../apicalls/requests'
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/loadersSlice";
import { pendingRequestCount } from '../../redux/transactionSlice';
import moment from 'moment'
import { setReloadUser } from '../../redux/userSlice';





const {TabPane} = Tabs

const Requests = () => {
  const [data, setData] = useState([])
  const [showNewRequestModal, setShowNewRequestModal] = useState(false)
  
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const loaduser = useSelector((store) => store.user.reloadUser);

  

  //get all the sent and recive request data 

  const getRequestData = async () => {
    try {
      dispatch(showLoading);

      const senderEmail = user.email;
      const receiverEmail = user.email;

      const response = await GetRequest(senderEmail, receiverEmail);

      const txnsData = response.data.data;

      const sendData = txnsData.filter((item) => item.sender === user.email);
      const receivedData = txnsData.filter((item) => item.receiver === user.email);
      
      if (response.data.success) {
        setData({
          sent: sendData,
          received: receivedData,
        });

        const pendingRequest = receivedData.filter((item) => item.status === 'pending')
        dispatch(pendingRequestCount(pendingRequest.length));
        
      }
      dispatch(hideLoading);
      dispatch(setReloadUser(false))
    } catch (error) {
      dispatch(hideLoading);
      message.error(error.message);
    }
  };


  useEffect(() => {
    getRequestData();
  }, []);


   if (loaduser) {
     getRequestData();
   }

  //calling the API to update the request status

  const updateStatus = async (record, status) => {
     try {
      dispatch(showLoading)
      const response = await UpdateRequestStatus({...record,status})
      dispatch(hideLoading)
      if(response.data.success){
        console.log(response.data.success);
        message.success(response.data.message)
        getRequestData();
        dispatch(setReloadUser(true))
      }else{
        //message.error(response.message)
      }
     } catch (error) {
       dispatch(hideLoading)
       message.error(null)
     }
  }

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text,record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A")
    },
    {
      title: "Sender",
      dataIndex: "sender",
    },
    {
      title: "Amount",
      dataIndex: "amount",
       render: (amount) => `GHS ${amount}`
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
    },
    {
      title: "Status",
      dataIndex: "status",
      
    },
    {
      title: "Reference",
      dataIndex: "reference",
      
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) =>{
        if(record.status === 'pending' && record.receiver === user.email){
          return (
            <div className="flex gap-1">
              <h1 className="text-sm underline"
              onClick={() => updateStatus(record, "rejected")}
              >
              Reject
              </h1>
              <h1 className="text-sm underline"
              onClick={() => updateStatus(record, "accepted")}
              >
              Accept
              </h1>
            </div>
          );
        }
      }
    }
  ];

  


  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Request" />
        <button
          className="primary-outlined-btn"
          onClick={() => setShowNewRequestModal(true)}
        >
          Request Funds
        </button>
      </div>

      <Tabs 
         defaultActiveKey="1"
         items={[
          {
            key: '1',
            label: 'Send Requests',
            children: (
              <div>
                {
                  data.sent && data.sent.length > 0 ? (<Table dataSource={data.sent} columns={columns} />): (<p>Loading...</p>)   
                }
              </div>
            ),
          },
          {
            key: '2',
            label: "Received Requests",
            children: (
              <div>
                {
                  data.received && data.received.length > 0 ? (<Table dataSource={data.received} columns={columns} />): (<p>Loading...</p>)
                }
              </div>
            )
          }
         ]}
      />

      {showNewRequestModal && (
        <RequestModal
          showReqModal={showNewRequestModal}
          setShowReqModal={setShowNewRequestModal}
        />
      )}
    </div>
  );
}

export default Requests
