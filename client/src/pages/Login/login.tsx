import React from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Form } from "antd";
import { Button, Input } from "../../components";
import { setLoggedIn } from "src/redux/slices/auth";
import { callLogin } from "./service";
import { FormContainer, HeaderHeading } from "./login.style";

const LoginForm = () => {
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    // const {confirm-password, password} = values;
    try {
      const response = await callLogin(values.email, values.password);
      console.log("Received values of form: ", values);
      console.log("API data >", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
      dispatch(setLoggedIn({ loggedIn: true }));
      <Navigate to="/" />;
    } catch (err) {
      console.log(err);
    }
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
          <Input type={"email"} placeholder="Email" />
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
