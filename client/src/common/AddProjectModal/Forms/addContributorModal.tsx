import React from "react";
import { Form } from "antd";
import { Button, Input, Notify } from "src/components";
import { Modal } from "src/components";
import { FormContainer, HeaderHeading } from "./addProjectModal.style";
import { ContributorData } from "./addProjectForm";

export interface Props {
  title: string;
  isModalVisible: boolean;
  closeModal: () => void;
  handleContributorAddition: (data: ContributorData) => void;
}
const AddContributorModal: React.FC<Props> = (props) => {
  const onFinish = async (values: any) => {
    try {
      console.log("Received values of form: ", values);
      props.handleContributorAddition({
        name: values.name,
        email: values.email,
      });
    } catch (err: any) {
      let message = "Unable to Signup User";
      if (err?.response) {
        message = err?.response?.data?.message;
        console.log(err?.response.data?.message); // => the response payload
      }
      Notify(message, "error");
    }
  };
  return (
    <Modal
      title={props.title}
      isModalVisible={props.isModalVisible}
      closeModal={() => props.closeModal()}
    >
      <FormContainer>
        <HeaderHeading>Add Contributor</HeaderHeading>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input placeholder="Please enter username" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email",
              },
            ]}
          >
            <Input placeholder="Email" type={"email"} />
          </Form.Item>

          <Form.Item className="flex-dir-column">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </FormContainer>
    </Modal>
  );
};

export default AddContributorModal;
