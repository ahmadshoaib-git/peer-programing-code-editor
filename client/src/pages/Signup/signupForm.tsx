import React from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Form } from "antd";
import { Button, Input } from "../../components";
import { setLoggedIn } from "src/redux/slices/auth";
import { FormContainer, HeaderHeading } from "./signup.style";

const SignupForm = () => {
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    const { confirmPassword, password } = values;
    if (confirmPassword === password) {
      dispatch(setLoggedIn({ loggedIn: true }));
      <Navigate to="/" />;
    }
    console.log("Received values of form: ", values);
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
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input placeholder="Email" type={"email"} />
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

        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please confirm your Password!",
            },
          ]}
        >
          <Input type="password" placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item className="flex-dir-column">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
          <span>
            Already have a login? <Link to="/login">Click here!</Link>
          </span>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default SignupForm;
