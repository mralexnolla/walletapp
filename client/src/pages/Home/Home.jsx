/* eslint-disable no-unused-vars */
import {useDispatch,useSelector} from "react-redux"
import PageTitle from "../../components/PageTitle"

const Home = () => {
    const dispatch = useDispatch()
    const user = useSelector(store => store.user.user)
    //console.log(user)
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
            <div className="flex justify-between">
              <h1 className="text-md">First Name</h1>
              <h1 className="text-md">{user.firstName}</h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-md">Last Name</h1>
              <h1 className="text-md"> {user.lastName}</h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-md">Email</h1>
              <h1 className="text-md"> {user.email}</h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-md">Mobile</h1>
              <h1 className="text-md"> {user.phone}</h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-md">ID type</h1>
              <h1 className="text-md"> {user.idType}</h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-md">ID Number</h1>
              <h1 className="text-md"> {user.idNumber}</h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-md">Tax Id</h1>
              <h1 className="text-md"> {user.tin}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home
