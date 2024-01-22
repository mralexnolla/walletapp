import { Col, Form, Row } from "antd";
import {useNavigate} from "react-router-dom"

const Login = () => {
   
  const navigate = useNavigate()  
  const onFinish = (values) => {
    console.log("Got value from the form: ", values);
  };

  return (
    <div className="bg-primary flex align-center justify-center h-screen">
      <div className="card w-400 p-2">
        <div className="flex align-center justify-between">
          <h1 className="text-2xl">RAPIDREQUEST - LOGIN</h1>
        </div>
        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={23}>
              <Form.Item label="Email" name="email">
                <input type="text" />
              </Form.Item>
            </Col>

            <Col span={23}>
              <Form.Item label="Password" name="password">
                <input type="password" />
              </Form.Item>
            </Col>
          </Row>

          <button className="primary-contained-btn w-100" type="submit">
            Login
          </button>
          <h1 className="text-sm underline mt-2" onClick={() => navigate("/register")}>Not yet a member | Register</h1>
        </Form>
      </div>
    </div>
  );
};

export default Login;
