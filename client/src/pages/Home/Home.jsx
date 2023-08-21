/* eslint-disable no-unused-vars */
import { message } from "antd";

import {useDispatch,useSelector} from "react-redux"
import PageTitle from "../../components/PageTitle"

const Home = () => {
    const dispatch = useDispatch()
    const user = useSelector(store => store.user.user)
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
              <h1 className="text-lg"> Ghs {user.avlbal || 0}</h1>
            </div>
          </div>
        </div>

        <div className="w-100">
          <div className="card p-2 mt-3 w-75 br-3 flex flex-col gap-1 uppercase">
            Chart
          </div>
        </div>
      </div>

      <div className="w-100">
        <div className="card p-2 mt-3 w-75 br-3 flex flex-col gap-1 uppercase">
          Transaction counts
        </div>
      </div>

      <div className="w-100">
        <div className="card p-2 mt-3 w-75 br-3 flex flex-col gap-1 uppercase">
          Other things
        </div>
      </div>

      <div className="w-100">
        <div className="card p-2 mt-3 w-75 br-3 flex flex-col gap-1 uppercase">
          And so on 
        </div>
      </div>
    </div>
  );
}

export default Home
