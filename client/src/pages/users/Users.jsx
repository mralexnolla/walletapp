import { useState } from "react"
import {useDispatch} from 'react-redux'
import { showLoading, hideLoading } from "../../redux/loadersSlice"
import { GetAllUsers, UpdateUserVerifiedStatus } from "../../apicalls/users"
import { useEffect } from "react"
import { Table, message } from "antd"
import PageTitle from "../../components/PageTitle"

function Users() {
  const [users, setUsers] = useState([])

  const dispatch = useDispatch()

  const getUserData = async () => {
    try {
      dispatch(showLoading);
      const response = await GetAllUsers()
      dispatch(hideLoading)
      if(response.data.success){
        setUsers(response.data.data)
      }
    } catch (error) {
      message.error(error.message)
    }
  }
 
  useEffect(() => {
    getUserData();
  },[])

  const updateStatus = async (record, isVerified) => {
     try {
      dispatch(showLoading)
      const response = await UpdateUserVerifiedStatus({
        selectedUser: record._id,
        isVerified,
      });
      console.log(response);
      dispatch(hideLoading)
      if(response.data.success){
        message.success(response.data.message)
        getUserData()
      }else{
        message.error(response.data.message)
      }
     } catch (error) {
      dispatch(hideLoading)
      message.error(error.message)
     }
  }

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    // {
    //   title: "Date Registered",
    //   dataIndex: "createdAt",
    //   render: (text, record) => {
    //     return moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A");
    //   },
    // },
    {
      title: "Verified",
      dataIndex: "isVerified",
      render: (isVerified) => {
        const colors = isVerified ? "success-bg" : "error-bg";
        return <span className={colors}>{isVerified ? "Verified" : "pending"}</span>;
      },
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className="flex gap-1">
            {record.isVerified ? (
              <button
                className="primary-outlined-btn"
                onClick={() => updateStatus(record, false)}
              >
                Suspend
              </button>
            ) : (
              <button
                className="primary-contained-btn"
                onClick={() => updateStatus(record, true)}
              >
                Verify
              </button>
            )}
          </div>
        );
      }

    }
  ];


  


  return (
    <div>
      <PageTitle title="Users"/>
      <Table dataSource={users} columns={columns} className="mt-2"/>
    </div>
  )
}

export default Users