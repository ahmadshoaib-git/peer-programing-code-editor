import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "antd";
import { Button, Input, Notify } from "../../components";
import { setLoggedIn } from "src/redux/slices/auth";
import { callLogin } from "./service";
import { FormContainer, HeaderHeading } from "./login.style";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    // const {confirm-password, password} = values;
    try {
      const response = await callLogin(values.email, values.password);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("name", response.data.name);
      dispatch(setLoggedIn({ loggedIn: true }));
      Notify(`Welcome back ${response.data.name}`, "success");
      navigate(`/`);
    } catch (err: any) {
      let message = "Unable to Login User";
      if (err?.response) {
        message = err?.response?.data?.message;
        console.log(err?.response.data?.message); // => the response payload
      }
      Notify(message, "error");
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
