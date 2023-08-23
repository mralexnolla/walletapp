/* eslint-disable no-unused-vars */
import { message } from "antd";

import {useDispatch,useSelector} from "react-redux"
import PageTitle from "../../components/PageTitle"


import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import Piechart from "../../charts/Piechart";







const Home = () => {
    const dispatch = useDispatch()
    const user = useSelector(store => store.user.user)
    const incomeData = useSelector((store) => store.requestCount.income);
    const expenseData = useSelector((store) => store.requestCount.expense)
    const balance = useSelector(store => store.user.balance)

    const totalIncome = incomeData;
    const totalExpense = expenseData;

    

  return (
    <div>
      <PageTitle title={`Welcome, ${user.firstName}`} />
      <div className="flex">
        <div className="w-100">
          <div className="bg-tertiary p-2 mt-3 w-75 br-3 flex flex-col gap-1 uppercase">
            <div className="flex justify-between">
              <h1 className="text-lg">Account</h1>
              <h1 className="text-lg">{user.email}</h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-lg">Available Balance</h1>
              <h1 className="text-lg"> Ghs {balance || 0}</h1>
            </div>
          </div>
        </div>

        <div className="w-100">
          <Row gutter={16} className="mt-3">
            <Col span={12}>
              <Card bordered={false} className="bg-tertiary">
                <Statistic
                  title={
                    <span className="text-lg text-black">Total Income</span>
                  }
                  value={totalIncome}
                  precision={2}
                  valueStyle={{
                    color: "#3f8600",
                  }}
                  prefix={<ArrowUpOutlined />}
                  //suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false} className="bg-tertiary">
                <Statistic
                  title={
                    <span className="text-lg text-black">Total Expense</span>
                  }
                  value={totalExpense}
                  precision={2}
                  valueStyle={{
                    color: "#cf1322",
                  }}
                  prefix={<ArrowDownOutlined />}
                  //suffix="%"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      <div className="w-100 flex justify-center">
        <div className="card p-2 mt-3 w-75 br-3 flex flex-col gap-1 uppercase">
          <Piechart />
        </div>
      </div>
    </div>
  );
}

export default Home
