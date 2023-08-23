import { Chart } from 'react-google-charts'
import { useSelector } from 'react-redux';

const Piechart = () => {

    const depositesCount = useSelector((store) => store.requestCount.depositeCount);
    const drTransfersCount = useSelector((store) => store.requestCount.debitTransferCount);
    const crTransfersCount = useSelector((store) => store.requestCount.creditTransferCount);
    const receiveRequestCount = useSelector((store) => store.requestCount.sendRequestCount);
    const sendRequestCount = useSelector((store) => store.requestCount.receivedRequestCount);
  
    const data = [
      ["Transactions", "Count"],
      ["Deposite", depositesCount],
      ["Dr Transfer", drTransfersCount],
      ["Cr Transfer", crTransfersCount],
      ["Send Request", sendRequestCount],
      ["Receive Request", receiveRequestCount],
    ];

    const options = {
      title: "My transactions Summary",
      is3D: true,
      width: 900,
      height: 400,
      fontSize: 18
    };

  return (
    <div>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        graph_id="PieChart"
        width="100%"
        height="400px"
      />
    </div>
  );
}

export default Piechart
