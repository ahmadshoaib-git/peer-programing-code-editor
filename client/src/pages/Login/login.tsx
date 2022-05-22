import React from "react";
import { Navigate } from "react-router-dom";
import { Form } from "antd";
import { useDispatch } from "react-redux";
import { Button, Input, PaswordInput } from "../../components";
import { setLoggedIn } from "src/redux/slices/auth";
import { FormContainer, HeaderHeading } from "./login.style";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    dispatch(setLoggedIn({ loggedIn: true }));
    console.log("Success:", values);
    <Navigate to="/" />;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <FormContainer>
      <HeaderHeading>Codepeer</HeaderHeading>
      <Form
        name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          //   label="Username"
          //   name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder={"email"} type={"email"} />
        </Form.Item>

        <Form.Item
          //   label="Password"
          //   name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <PaswordInput placeholder={"Password"} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button>Submit</Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default LoginForm;
