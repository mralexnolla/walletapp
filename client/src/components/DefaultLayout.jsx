/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FloatButton, message } from "antd";
import { CommentOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { GetRequest } from "../apicalls/requests";
import {
  pendingRequestCount,
  sumIncome,
  sumExpense,
  numberOfDeposites,
  numberOfDebitTransfer,
  numberOfCreditTransfer,
  numberOfSendRequest,
  numberOfReceivedRequest,
} from "../redux/transactionSlice";
import { setReloadUser, getBalance } from "../redux/userSlice";
import { GetUserTransactionsApiCall } from "../apicalls/transactions";
import { GetUserInfo } from "../apicalls/users";


const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  


  const getRequestCount = async () => {
    try {
      const senderEmail = user.email;
      const receiverEmail = user.email;

      const response = await GetRequest(senderEmail, receiverEmail);
      const txnsData = response.data.data;

      const receivedData = txnsData.filter(
        (item) => item.receiver === user.email
      );

      if (response.data.success) {
        const pendingRequest = receivedData.filter(
          (item) => item.status === "pending"
        );
        dispatch(pendingRequestCount(pendingRequest.length));
      }
      dispatch(setReloadUser(false));
    } catch (error) {
      message.error(error.message);
    }
  };

  const getTransactionData = async () => {
    try {
      const senderEmail = user.email;
      const receiverEmail = user.email;

      const response = await GetUserTransactionsApiCall(
        senderEmail,
        receiverEmail
      );
      
      const txnData = response.data.data

      //console.log(txnData)
      
      const incomingTxn = txnData.filter(
        (txn) => txn.receiver === user.email && txn.sender !== "Cash Deposite"
      );

      const expenseTxn = txnData.filter((txn) => txn.sender === user.email)
      
      /** for the pie chart */
      const deposites = txnData.filter((txn) => txn.sender === "Cash Deposite")
      const receiveRequest = txnData.filter((txn) => txn.sender === user.email && txn.reference.startsWith("SR"));
      const sendRequest = txnData.filter((txn) => txn.receiver === user.email && txn.reference.startsWith("SR"));
      
      if(response.data.success){
        const sumIncomeAmount = incomingTxn.reduce((sum, txn) => sum + txn.amount, 0 )
        const totalIncome = parseFloat(sumIncomeAmount).toFixed(2);
        dispatch(sumIncome(totalIncome));
        
        const sumExpenseAmount = expenseTxn.reduce((sum, txn) => sum + txn.amount, 0)
        const totalExpense = parseFloat(sumExpenseAmount).toFixed(2);
        dispatch(sumExpense(totalExpense));

        const numOfdeposites = deposites.length
        dispatch(numberOfDeposites(numOfdeposites));

        const numDebitTrans = expenseTxn.length
        dispatch(numberOfDebitTransfer(numDebitTrans));

        const numCreditTrans = incomingTxn.length
        dispatch(numberOfCreditTransfer(numCreditTrans));

        const numSenReq = receiveRequest.length;
        dispatch(numberOfSendRequest(numSenReq));

        const numRecReq = sendRequest.length;
        dispatch(numberOfReceivedRequest(numRecReq));
      }
      dispatch(setReloadUser(false));

    } catch (error) {
      message.error(error.message);
    }
  };

  const getUserBalace = async () => {
    try {
      const response = await GetUserInfo()
      if(response.success){
        const balance = response.data.avlbal;
        dispatch(getBalance(balance));
      }
      dispatch(setReloadUser(false));
    } catch (error) {
      message.error(error.message)
    }
  }

  const pendingCount = useSelector((store) => store.requestCount.requestCount);
  const loaduser = useSelector((store) => store.user.reloadUser);

  useEffect(() => {
    getRequestCount();
    getTransactionData()
    getUserBalace()
  }, []);

  if (loaduser) {
    getRequestCount();
    getTransactionData();
    getUserBalace()
  }

  const userMenu = [
    {
      title: "Home",
      icon: <i className="ri-home-wifi-line"></i>,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Transactions",
      icon: <i className="ri-bank-line"></i>,
      onClick: () => navigate("/transactions"),
      path: "/transactions",
    },
    {
      title: "Requests",
      icon: <i className="ri-hand-heart-line"></i>,
      onClick: () => navigate("/requests"),
      path: "/requests",
    },
    {
      title: "Profile",
      icon: <i className="ri-user-3-line"></i>,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
    {
      title: "Voice",
      icon: <i className="ri-voice-recognition-line"></i>,
      onClick: () => navigate("/voice"),
      path: "/voice",
    },
    {
      title: "Reports",
      icon: <i className="ri-folder-chart-line"></i>,
      onClick: () => navigate("/report"),
      path: "/report",
    },
    {
      title: "Logout",
      icon: <i className="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/login",
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      icon: <i className="ri-home-wifi-line"></i>,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "users",
      icon: <i className="ri-user-settings-line"></i>,
      onClick: () => navigate("/users"),
      path: "/users",
    },
    {
      title: "Transactions",
      icon: <i className="ri-bank-line"></i>,
      onClick: () => navigate("/transactions"),
      path: "/transactions",
    },
    {
      title: "Requests",
      icon: <i className="ri-hand-heart-line"></i>,
      onClick: () => navigate("/requests"),
      path: "/requests",
    },
    {
      title: "Profile",
      icon: <i className="ri-user-3-line"></i>,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
    {
      title: "Voice",
      icon: <i className="ri-voice-recognition-line"></i>,
      onClick: () => navigate("/voice"),
      path: "/voice",
    },
    {
      title: "Reports",
      icon: <i className="ri-folder-chart-line"></i>,
      onClick: () => navigate("/report"),
      path: "/report",
    },
    {
      title: "Logout",
      icon: <i className="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/login",
    },
  ];

  const menuToRender = user.isAdmin ? adminMenu : userMenu;

  return (
    <div className="layout">
      {/** the side bar */}
      <div className="sidebar">
        <div className="menu">
          {menuToRender.map((item, idx) => {
            const isActive = window.location.pathname === item.path;
            //console.log(window.location.pathname);

            return (
              <div
                key={item + `${idx}`}
                className={`menu-item ${isActive ? "active-menu-item" : ""}`}
                onClick={item.onClick}
              >
                {item.icon}
                {!collapsed && <h1 className="text-sm">{item.title}</h1>}
              </div>
            );
          })}
        </div>
      </div>

      {/** The body  */}
      <div className="body">
        {/** Body header */}
        <div className="header flex justify-between align-center">
          <div>
            {collapsed && (
              <i
                className="ri-menu-2-line"
                onClick={() => setCollapsed(false)}
              ></i>
            )}
            {!collapsed && (
              <i
                className="ri-close-line"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
          </div>

          <div>
            <h1 className="text-xl">RAPIDREQUEST</h1>
          </div>

          <div>
            <h1 className="text-sm underline">
              {user.firstName} {user.lastName}
            </h1>
          </div>
        </div>

        {/** Body Content */}
        <div className="content"> {children}</div>

        <FloatButton.Group
          trigger="hover"
          type="primary"
          style={{
            right: 94,
          }}
          icon={<VerticalAlignTopOutlined />}
        >
          <FloatButton
            tooltip={<div>Pending Request</div>}
            badge={{
              count: pendingCount,
              color: "green",
              onClick: () => navigate("/requests"),
            }}
          />
          <FloatButton
            tooltip={<div>Comming soon</div>}
            icon={<CommentOutlined />}
          />
        </FloatButton.Group>
      </div>
    </div>
  );
};

export default DefaultLayout;
