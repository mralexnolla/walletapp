import { Col, Form, Row, message, Select } from "antd";
import {useNavigate} from "react-router-dom"
import { RegisterUserApiCall } from "../../apicalls/users";

function Register() {

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await RegisterUserApiCall(values); // this is from the apicalls folder
      console.log(response);
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log(error)
      message.error(error.message);
    }
  };

  /** The unfinish method could also be writen like this 
     * 
 const onFinish = async (values) => {
  try {
    const response = await axios.post('/api/users/register', values, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response);
    if (response.data.success) {
      message.success(response.data.message);
      navigate('login');
    } else {
      message.error(response.data.message);
    }
  } catch (error) {
    message.error(`Issue with REGISTRATION: ${error.response.data}`);
  }
};
     * 
     */

  return (
    <div className="m-5">
      <div className="flex align-center justify-between">
        <h1 className="text-2xl">RAPIDREQUEST - REGISTER</h1>
        <h1 className="text-sm underline" onClick={() => navigate("/login")}>
          Already a member | Login
        </h1>
      </div>
      <hr />
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ idType: "select_id_type" }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={6}>
            <Form.Item label="First Name" name="firstName">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Last Name" name="lastName">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Email" name="email">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="mobile" name="phone">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Identification Type" name="idType">
              {/*
            <select defaultValue="select_id_type">
                <option value="select_id_type" disabled>
                  Select the type of ID
                </option>
                <option value="NATIONAL ID">National ID</option>
                <option value="PASSPORT">Passport</option>
                <option value="DRIVING LICENSE">Driving License</option>
                <option value="VOTERS CARD">Voters Card</option>
                <option value="SOCIAL CARD">Social Security Card</option>
                <option value="NON CITIZEN ID">Non Citizen ID</option>
                <option value="NHIS">National Health Insurance ID</option>
              </select>
              */}

              <Select
                style={{ width: 255, border: "1px solid #595959" }}
                options={[
                  {
                    value: "select_id_type",
                    label: "Select the type of ID",
                    disabled: true,
                  },
                  {
                    value: "NATIONAL ID",
                    label: "National ID",
                  },
                  {
                    value: "PASSPORT",
                    label: "Passport",
                  },
                  {
                    value: "DRIVING LICENSE",
                    label: "Driving License",
                  },
                  {
                    value: "VOTERS CARD",
                    label: "Voters Card",
                  },
                  {
                    value: "SOCIAL CARD",
                    label: "Social Security Card",
                  },
                  {
                    value: "NON CITIZEN ID",
                    label: "Non Citizen ID",
                  },
                  {
                    value: "NHIS",
                    label: "National Health Insurance ID",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Identification Number" name="idNumber">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Tax Identification Number" name="tin">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Address" name="address">
              <textarea type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Password" name="password">
              <input type="password" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Confirm Password" name="confirmPassword">
              <input type="password" />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end">
          <button className="bg-secondary primary-contained-btn" type="submit">
            Register
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Register;