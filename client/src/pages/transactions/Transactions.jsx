import { useState } from "react";
import PageTitle from "../../components/PageTitle";
import {Table} from "antd";
import FundTransferModal from "./FundTransferModal";

const Transactions = () => {

  const [showFtModal, setShowFtModal] = useState(false)
   
  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Sender",
      dataIndex: "sender",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
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

  return (
    <div>
      <div className="flex justify-between align-center">
        <PageTitle title="Transactions" />

        <div className="flex gap-1">
          <div className="primary-outlined-btn">Deposite</div>
          <div
            className="primary-contained-btn"
            onClick={() => setShowFtModal(true)}
          >
            Transfer
          </div>
        </div>
      </div>

      <Table dataSource={[]} columns={columns} className="mt-2 table" />

      {showFtModal && <FundTransferModal showFtModal={showFtModal} setShowFtModal={setShowFtModal} />}
    </div>
  );
};

export default Transactions;
