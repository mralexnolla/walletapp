/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Modal, Form, Input, message } from "antd";
import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { PaystackButton } from "react-paystack";
import { useEffect } from "react";
import { depositeReference } from "../../referengenerator/randomgenerator";
import { CashDepositeApiCall } from "../../apicalls/transactions";
import { showLoading, hideLoading } from "../../redux/loadersSlice";
import dotenv from 'dotenv'



const DepositeModal = ({showDepositeModal, setShowDepositeModal}) => {

    const user = useSelector((store) => store.user.user);
    const dispatch = useDispatch()

    dotenv.config();

    const publicKey = process.env.PUBLICKEY;
    const currency = "GHS";
    const [amount, setAmount] = useState(0); // Remember, set in kobo!
    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(`${user.firstName} ${user.lastName}`);
    const [phone, setPhone] = useState(user.phone);
    const [form] = Form.useForm();

    const [multiplyer, setMultiplyer] = useState(100)

    const handleSubmit = async () => {
      try {
         dispatch(showLoading);
         const payload = {
           amount: amount,
           receiver: email,
           description: `Deposite of Ghs ${amount} by you`,
           sender: "Cash Deposite",
           reference: depositeReference(),
           status: "success"
         };
          

         const response = await CashDepositeApiCall(payload);
         if(response.data.success){
            setShowDepositeModal(false);
            message.success(response.data.message);
         }else{
            message.error(response.data.message);
         }
        dispatch(hideLoading)
      } catch (error) {
          console.log("Error object:", error);
          message.error(error.message);
          dispatch(hideLoading);
      }
      
    }

     const componentProps = {
       email,
       amount: amount * multiplyer,
       currency,
       metadata: {
         name,
         phone,
       },
       publicKey,
       text: "Deposite Now",
       onSuccess: () => handleSubmit(),
       //onClose: () => alert(" #thanU4Ex16 "),
     }
    
  return (
    <Modal
      title="Deposite"
      open={showDepositeModal}
      onCancel={() => setShowDepositeModal(false)}
      footer={null}
    >
      <div className="flex-col gap-1">
        <Form layout="vertical" form={form} >
          <Form.Item
            label="Amount"
            //name="amount"
            initialValue={0}
            rules={[
              {
                required: true,
                message: `Input the amount`,
              },
            ]}
          >
            <Input
              type="number"
              value={amount}
              min={0}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="email"
            //name="email"
            rules={[
              {
                required: true,
                message: `Input the Email`,
              },
            ]}
          >
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="name"
            //name="name"
            rules={[
              {
                required: true,
                message: `Input the name`,
              },
            ]}
          >
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="phone"
            //name="phone"
            rules={[
              {
                required: true,
                message: `Input the phone`,
              },
            ]}
          >
            <Input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Item>

          <div className="flex justify-end gap-1">
            <button
              className="primary-outlined-btn"
              onClick={() => setShowDepositeModal(false)}
            >
              cancel
            </button>
            <PaystackButton
              {...componentProps}
              
              className="primary-contained-btn"
            />
          </div>
        </Form>
      </div>
    </Modal>
  );
}

export default DepositeModal
