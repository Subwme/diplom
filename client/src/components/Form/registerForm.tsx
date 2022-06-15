import { IRegisterData } from "../../types";
import { setUserAction } from "../../store/reducers/reducer";
import { useAppDispatch } from "../../store";
import { authentication } from "../../apiProvider";
import config from "../../configServer.json";
import { useHistory } from "react-router-dom";
import { Button, Form, Input, Col, Row, Card } from "antd";

const RegisterForm = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const onSubmit = (data: IRegisterData) => {
    authentication(config.endPoint + "/auth/sign-up", data).then((user) => {
      dispatch(setUserAction(user));
      history.replace("/");
    });
  };

  return (
    <>
      <Card title="Регистрация" bordered={true}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[
              { required: true, message: "Please input your username!" },
              {
                min: 3,
                message: "Minimum username length is 3 symbols",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                message: "Please enter correct email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 8, message: "Minimum length password in 8 symbols" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Row>
        <Col span={12} offset={6}>
          <h5 className="login-footer-text">
            Welcome to shop! Design by Maksim Krasnikov IT Shcool.
          </h5>
        </Col>
      </Row>
    </>
  );
};

export default RegisterForm;
