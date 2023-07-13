import { Col, Form, Row } from "antd";

function Register() {

    const onFinish = (values) => {
        console.log("Got value from the form: ", values)
    }

  return (
    <div className="m-5">
      <div className="flex align-center justify-between">
        <h1 className="text-2xl">RAPIDREQUEST - REGISTER</h1>
        <h1 className="text-sm underline">
            Already a member | Login
        </h1>
      </div>
      <hr />
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={6}>
            <Form.Item label="First Name" name="firstName">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Last Name" name="lasttName">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Email" name="email">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="mobile" name="mobileNumber">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Identification Type" name="identificationType">
              <select>
                <option value="NATIONAL ID">National ID</option>
                <option value="PASSPORT">Passport</option>
                <option value="DRIVING LICENSE">Driving License</option>
                <option value="VOTERS CARD">Voters Card</option>
                <option value="SOCIAL CARD">Social Security Card</option>
                <option value="NON CITIZEN ID">Non Citizen ID</option>
                <option value="NHIS">National Health Insurance ID</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Identification Number"
              name="identificationNumber"
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Tax Identification Number" name="tin">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Address" name="Address">
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
          <button className="primary-contained-btn" type="submit">
            Register
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Register;
