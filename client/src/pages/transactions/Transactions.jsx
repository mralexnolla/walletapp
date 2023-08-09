/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import PageTitle from "../../components/PageTitle";
import {Table, message} from "antd";
import FundTransferModal from "./FundTransferModal";
import { GetUserTransactionsApiCall } from "../../apicalls/transactions";
import {useDispatch, useSelector} from "react-redux"
import { showLoading, hideLoading } from "../../redux/loadersSlice";
import { useEffect } from "react";
import moment from "moment"
import DepositeModal from "./DepositeModal";
import { setReloadUser } from "../../redux/userSlice";


const Transactions = () => {

  const [showFtModal, setShowFtModal] = useState(false)
  const [data, setData] = useState([])

  const dispatch = useDispatch()
  const user = useSelector(store => store.user.user)
  const loaduser = useSelector((store) => store.user.reloadUser);

 

  const [showDepositeModal, setShowDepositeModal] = useState(false)
  
   
  const columns = [
    // {
    //   title: "Transaction ID",
    //   dataIndex: "_id",
    // },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A");
      },
    },
    {
      title: "Sender",
      dataIndex: "sender",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (amount) => `GHS ${amount}`,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => {
        return record.sender == user.email ? "Dr" : "Cr";
      },
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
  ];
  
  const getData = async () => {
    try {
      dispatch(showLoading)

      const senderEmail = user.email
      const receiverEmail = user.email

      const response = await GetUserTransactionsApiCall(senderEmail, receiverEmail);
      const txnsData = response.data.data
      if (response.data.success) {
        setData(txnsData);
        
      }
      dispatch(hideLoading)
      dispatch(setReloadUser(false))
    } catch (error) {
      dispatch(hideLoading)
      message.error(error.message)
    }
   
  }
  useEffect(() => {
    getData() 
  },[])

  if(loaduser){
    getData()
  }

  



  return (
    <div>
      <div className="flex justify-between align-center">
        <PageTitle title="Transactions" />

        <div className="flex gap-1">
          <div
            className="primary-outlined-btn"
            onClick={() => setShowDepositeModal(true)}
          >
            Deposite
          </div>
          <div
            className="primary-contained-btn"
            onClick={() => setShowFtModal(true)}
          >
            Transfer
          </div>
        </div>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        className="mt-2 table"
        rowKey="_id"
      />

      {showFtModal && (
        <FundTransferModal
          showFtModal={showFtModal}
          setShowFtModal={setShowFtModal}
        />
      )}

      {showDepositeModal && (
        <DepositeModal
          showDepositeModal={showDepositeModal}
          setShowDepositeModal={setShowDepositeModal}
        />
      )}
    </div>
  );
};

export default Transactions;
