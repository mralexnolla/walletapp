/* eslint-disable no-unused-vars */
import React from 'react'
import { Tabs, Table,  message } from "antd";
import PageTitle from '../../components/PageTitle'
import { useState, useEffect } from "react";
import RequestModal from './RequestModal'
import { GetRequest } from '../../apicalls/requests'
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/loadersSlice";
import moment from 'moment'


const {TabPane} = Tabs

const Requests = () => {
  const [data, setData] = useState([])
  const [showNewRequestModal, setShowNewRequestModal] = useState(false)

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

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
    }
  ];

  const getRequestData = async () => {
    try {
      dispatch(showLoading);

      const senderEmail = user.email;
      const receiverEmail = user.email;

      const response = await GetRequest(
        senderEmail,
        receiverEmail
      );

      const txnsData = response.data.data;
      
      const sendData = txnsData.filter((item) => item.sender === user.email)
      const receivedData = txnsData.filter((item) => item.receiver === user.email)
      if (response.data.success) {
        setData({
          sent: sendData,
          received: receivedData,
        });
      }
      dispatch(hideLoading);
    } catch (error) {
      dispatch(hideLoading);
      message.error(error.message);
    }
  };
  

  useEffect(() => {
    getRequestData();
  }, []);


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

      <Tabs defaultActiveKey="1">
        <TabPane tab="Send Requests" key="1">
          {
              data.sent && data.sent.length > 0 ? (<Table dataSource={data.sent} columns={columns} />): (<p>No data found</p>)   
          }
        </TabPane>
        <TabPane tab="Received Requests" key="2">
          {
            data.received && data.received.length > 0 ? (<Table dataSource={data.received} columns={columns} />): (<p>No data found</p>)
          }
          
        </TabPane>
      </Tabs>

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
