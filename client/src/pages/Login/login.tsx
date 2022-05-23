import React from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Form } from "antd";
import { Button, Input } from "../../components";
import { setLoggedIn } from "src/redux/slices/auth";
import { FormContainer, HeaderHeading } from "./login.style";

const LoginForm = () => {
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    // const {confirm-password, password} = values;
    console.log("Received values of form: ", values);
    dispatch(setLoggedIn({ loggedIn: true }));
    <Navigate to="/" />;
  };

  return (
    <FormContainer>
      <HeaderHeading>Codepeer</HeaderHeading>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input type={"email"} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item className="flex-dir-column">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <span>
            Or <Link to="/signup">register now!</Link>
          </span>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default LoginForm;
