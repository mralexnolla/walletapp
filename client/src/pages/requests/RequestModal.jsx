/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Form, Input, Modal, InputNumber, message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/loadersSlice";
import {VerifyAccountApiCall,TransferFundsApiCall,} from "../../apicalls/transactions";
import { sendRequestReference } from "../../referengenerator/randomgenerator";
import { SendRequest } from "../../apicalls/requests";

const RequestModal = ({ showReqModal, setShowReqModal, reloadData }) => {
  const [isVerified, setIsVerified] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

  

  const verifyAccount = async () => {
    try {
      dispatch(showLoading);
      const response = await VerifyAccountApiCall({
        receiver: form.getFieldValue("receiver"),
      });
      //console.log(response.data)
      dispatch(hideLoading);
      if (response.data.success) {
        setIsVerified(response.data.success);
        setErrorMessage(response.data.message);
      } else {
        setIsVerified(response.data.success);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading);
      setIsVerified(response.data.success);
      setErrorMessage(response.data.message);
    }
  };

  const closeModal = () => {
    setShowReqModal(false);
  };

  const onFinish = async (values) => {
    console.log(values);
    try {
      dispatch(showLoading);
      const payload = {
        ...values,
        sender: user.email,
        //type: "Dr",
        reference: sendRequestReference(),
        status: "success",
      };

      const response = await SendRequest(payload);
      if (response.data.success) {
        setShowReqModal(false);
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }

      dispatch(hideLoading);
    } catch (error) {
      console.log("Error object:", error);
      message.error(error.message);
      dispatch(hideLoading);
    }
  };

  return (
    <div>
      <Modal
        title="Request Funds"
        open={showReqModal}
        onCancel={closeModal}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
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

          {isVerified && <div className="success-bg">{errorMessage}</div>}

          {!isVerified && errorMessage && (
            <div className="error-bg">{errorMessage}</div>
          )}

          <Form.Item
            label="Amount"
            name="amount"
            initialValue={5}
            rules={[
              { required: true, message: "Please enter the amount" },
              {
                type: "number",
                max: user.avlbal,
                message: "Insuficient Balance",
              },
              {
                type: "number",
                min: 5,
                message: "Minimum amount to send is Ghs 5"
              }
            ]}
          >
            <InputNumber style={{ width: "150px" }} min={0} />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>

          {isVerified && (
            <div className="flex justify-end gap-1">
              <button className="primary-outlined-btn">Cancel</button>

              {form.getFieldValue("amount") < user.avlbal && (
                <button className="primary-contained-btn">Request</button>
              )}
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default RequestModal;
