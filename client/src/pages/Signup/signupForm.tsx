import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "antd";
import { Button, Input, Notify } from "../../components";
import { setLoggedIn } from "src/redux/slices/auth";
import { callSignup } from "./service";
import { FormContainer, HeaderHeading } from "./signup.style";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      const { username, email, confirmPassword, password } = values;
      if (confirmPassword === password) {
        const response = await callSignup(username, email, password);
        localStorage.setItem("token", response.token);
        localStorage.setItem("email", response.email);
        localStorage.setItem("name", response.name);
        dispatch(setLoggedIn({ loggedIn: true }));
        Notify("User created successfully!", "success");
        navigate(`/`);
      } else {
        Notify("Password and confirm password dont match!", "error");
      }
    } catch (err: any) {
      console.log(err);
      let message = "Unable to Signup User";
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
