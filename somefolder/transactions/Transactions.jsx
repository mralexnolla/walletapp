import PageTitle from "../../components/PageTitle";
import {Table} from "antd";

const Transactions = () => {
   
  const columns = [
    {
      title: "Date",
      dataIndex: "date" 
    },
    {
      title: "Amount",
      dataIndex: "amount" 
    },
    {
      title: "Type",
      dataIndex: "type" 
    },
    {
      title: "Reference",
      dataIndex: "reference" 
    },
    {
      title: "Status",
      dataIndex: "status" 
    },

  ]

  return (
    <div>
      <div className="flex justify-between align-center">
        <PageTitle title="Transactions" />

        <div className="flex gap-1">
          <div className="primary-outlined-btn">Deposite</div>
          <div className="primary-contained-btn">Transfer</div>
        </div>
      </div>

      <Table dataSource={[]} columns={columns} className="mt-2 table"/>
    </div>
  );
};

export default Transactions;
