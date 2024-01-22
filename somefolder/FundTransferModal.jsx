/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Form, Input, Modal, InputNumber } from "antd";
import { useState } from "react";
import {useDispatch} from 'react-redux'
import { showLoading, hideLoading } from "../../redux/loadersSlice";
import { VerifyAccountApiCall } from "../../apicalls/transactions";
import { useEffect } from "react";


const FundTransferModal = ({ showFtModal, setShowFtModal, reloadData }) => {

    const [isVerified, setIsVerified] = useState("")
    const [message, setMessage] = useState("")
    const [form] = Form.useForm()
    
    
    const dispatch = useDispatch()

    const verifyAccount = async () => {
        try {
            dispatch(showLoading)
            const response = await VerifyAccountApiCall({receiver: form.getFieldValue("receiver")});
            console.log(response.data)
            dispatch(hideLoading)
            if (response.data.success) {
              setIsVerified(response.data.success);
              setMessage(response.data.message)
            } else {
              setIsVerified(response.data.success);
              setMessage(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading)
            setIsVerified(response.data.success);
            setMessage(response.data.message);
        }
    }

    const closeModal = () => {
       setShowFtModal(false)
    }

  return (
    <div>
      <Modal
        title="Transfer Funds"
        open={showFtModal}
        onCancel={closeModal}
        footer={null}
      >
        <Form layout="vertical" form={form}>
          <div className="flex gap-2 align-center">
            <Form.Item label="Account Number" name="receiver" className="w-100">
              <Input placeholder="Enter the receivers email" />
            </Form.Item>
            <button
              type="button"
              className="primary-contained-btn mt-1"
              onClick={verifyAccount}
            >
              Verify
            </button>
          </div>

          {isVerified && <div className="success-bg">{message}</div>}

          {!isVerified && message && <div className="error-bg">{message}</div>}

          <Form.Item label="Amount" name="amount">
            <InputNumber style={{ width: "150px" }} min={0} />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>

          {isVerified && (
            <div className="flex justify-end gap-1">
              <button className="primary-outlined-btn">Cancel</button>
              <button className="primary-contained-btn">Send</button>
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default FundTransferModal;
