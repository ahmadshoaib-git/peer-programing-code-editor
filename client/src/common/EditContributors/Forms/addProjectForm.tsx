import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { Form } from "antd";
import { addProject } from "../service";
import { Button, Input, Notify, Modal, IconButton } from "src/components";
import AddContributorModal from "./addContributorModal";
import {
  FormContainer,
  HeaderHeading,
  ContributorHeadingWrapper,
  ListWrapper,
  CustomModalList,
  SpanWrapper,
  CustomEmpty,
} from "./addProjectModal.style";

export interface Props {
  title: string;
  isModalVisible: boolean;
  closeModal: () => void;
  saveContributors: (data: any) => void;
  contributors?: any;
}
export interface ContributorData {
  name: String;
  email: String;
}
const EditContributorModal: React.FC<Props> = (props) => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  // const [disable, setDisable] = useState(false);
  const [contributors, addContributor] = useState<Array<ContributorData>>([]);
  const [openAddContributorModal, setOpenAddContributorModal] = useState(false);
  const email = localStorage.getItem("email");
  useEffect(() => {
    try {
      const { contributors } = props;
      const tempContributor = contributors?.map((obj: any) => {
        return {
          name: obj.name,
          email: obj.email,
        };
      });
      addContributor(tempContributor);
    } catch (err) {
      console.log(`err >${err}`);
    }
  }, []);
  // useEffect(() => {
  //   const disableBtn =
  //     JSON.stringify(contributors) === JSON.stringify(props.contributors);
  //   setDisable(disableBtn);
  //   console.log(`disableBtn > ${disableBtn}`);
  // }, [contributors]);
  const onFinish = async (values: any) => {
    props.saveContributors(contributors);
  };

  const addContributorToProject = (contributor: ContributorData) => {
    addContributor([...contributors, contributor]);
    setOpenAddContributorModal(false);
  };

  const deleteContributor = (email: String) => {
    const tempContributors = contributors.filter(
      (contributor) => contributor.email !== email
    );
    addContributor(tempContributors);
    console.log("tempContributors >", tempContributors);
  };

  const disableBtn =
    JSON.stringify(contributors) === JSON.stringify(props.contributors);
  console.log("contributors >", contributors);
  console.log("props.contributors >", props.contributors);
  return (
    <Modal {...props}>
      <FormContainer>
        <HeaderHeading>Project Contributors</HeaderHeading>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <AddContributorModal
            title=""
            isModalVisible={openAddContributorModal}
            handleContributorAddition={addContributorToProject}
            closeModal={() => setOpenAddContributorModal(false)}
          />
          <ContributorHeadingWrapper>
            <h3>
              <FaUsers />
              Project Contributors
            </h3>
            <div onClick={() => setOpenAddContributorModal(true)}>
              <IconButton title={"Add Contributor"}>
                <HiUserAdd />
              </IconButton>
            </div>
          </ContributorHeadingWrapper>
          <ListWrapper>
            {contributors?.length > 0 ? (
              <CustomModalList>
                {contributors?.map((contributor, index) => (
                  <li key={index.toString()}>
                    <div className="detail-section">
                      <div>
                        <span className="title">Name:</span>
                        <span className="highlight">{contributor?.name}</span>
                      </div>
                      <div>
                        <span className="title">Email:</span>
                        <span className="highlight">{contributor?.email}</span>
                      </div>
                    </div>
                    <div className="remove-section">
                      <SpanWrapper
                        onClick={() =>
                          deleteContributor(contributor?.email || "")
                        }
                      >
                        <IconButton title={"Delete Contributor"}>
                          <MdOutlineDeleteForever />
                        </IconButton>
                      </SpanWrapper>
                    </div>
                  </li>
                ))}
              </CustomModalList>
            ) : (
              <CustomEmpty description="No contributor added." />
            )}
          </ListWrapper>
          <Form.Item className="flex-dir-column">
            <Button
              disabled={disableBtn}
              loading={loading}
              // type="primary"
              htmlType="submit"
              // className="login-form-button"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </FormContainer>
    </Modal>
  );
};

export default EditContributorModal;
