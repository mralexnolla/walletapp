import { useState, useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import { Table, message, Select, DatePicker, Space } from "antd";
import { GetUserTransactionsApiCall } from "../../apicalls/transactions";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/loadersSlice";
import moment from "moment";

import { setReloadUser } from "../../redux/userSlice";

const Reports = () => {

  
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const loaduser = useSelector((store) => store.user.reloadUser);

  const [category, setCategory] = useState("All");
  //const [display, setDisplay] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

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
      dispatch(showLoading);

      const senderEmail = user.email;
      const receiverEmail = user.email;

      const response = await GetUserTransactionsApiCall(
        senderEmail,
        receiverEmail
      );
      const txnsData = response.data.data;
      
      if (response.data.success) {
        setData(txnsData);
      }
      dispatch(hideLoading);
      dispatch(setReloadUser(false));
    } catch (error) {
      dispatch(hideLoading);
      message.error(error.message);
    }
  };
  
  /* The search algorithm */
  
  let filteredData = data;

  if (category === "All") {
    if (startDate && endDate) {
      filteredData = data.filter((txn) => {
        const transactionDate = moment(txn.createdAt);
        return (
          transactionDate >= startDate.startOf("day") &&
          transactionDate <= endDate.endOf("day")
        );
      });
      console.log(filteredData);
    }
  } else if (category === "Reference") {
    if (searchText) {
      filteredData = data.filter((txn) => {
        return txn.reference.toLowerCase().startsWith(searchText.toLowerCase());
      });
    }
  } else if (category === "Sender") {
    if (searchText) {
      filteredData = data.filter((txn) => {
        return txn.sender.toLowerCase().startsWith(searchText.toLowerCase());
      });
    }
  } else if (category === "Receiver") {
    if (searchText) {
      filteredData = data.filter((txn) => {
        return txn.receiver.toLowerCase().startsWith(searchText.toLowerCase());
      });
    }
  } else if (category === "Description") {
    if (searchText) {
      filteredData = data.filter((txn) => {
        return txn.description.toLowerCase().startsWith(searchText.toLowerCase());
      });
    }
  }

/* end of search algorithm */



  

  useEffect(() => {
    getData();
  }, []);

  if (loaduser) {
    getData();
  }

  return (
    <div>
      <div className="flex justify-between align-center">
        <PageTitle title="Reports" />

        <div className="flex gap-1">
          <div className="flex gap-1">
            {category === "Reference" ||
            category === "Description" ||
            category === "Sender" ||
            category === "Receiver" ? (
              <input
                className="primary-outlined-btn"
                type="text"
                placeholder={
                  category === "Reference" ? "Search by SR,CD or FT" : `Search by ${category}`
                }
                onChange={(e) => setSearchText(e.target.value)}
                style={{ /*textTransform: "lowercase",*/ borderRadius: 5 }}
              />
            ) : (
              <Space direction="horizontal">
                <DatePicker
                  placeholder="Start Date"
                  onChange={(date) => setStartDate(date)}
                />
                <DatePicker
                  placeholder="End Date"
                  onChange={(date) => setEndDate(date)}
                />
              </Space>
            )}
          </div>

          <Select
            defaultValue="All"
            style={{
              width: 120,
            }}
            onChange={(value) => setCategory(value)}
            options={[
              {
                value: "All",
                label: "All",
              },
              //   {
              //     value: "Date",
              //     label: "Date",
              //   },
              {
                value: "Reference",
                label: "Reference",
              },
              {
                value: "Sender",
                label: "Sender",
              },
              {
                value: "Receiver",
                label: "Receiver",
              },
              {
                value: "Description",
                label: "Description",
              },
            ]}
          />
        </div>
      </div>

      <Table
        dataSource={filteredData}
        columns={columns}
        className="mt-2 table"
        rowKey="_id"
      />
    </div>
  );
};

export default Reports;
