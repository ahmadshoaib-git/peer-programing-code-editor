import React, { useState } from "react";
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
  refreshData?: () => void;
}
export interface ContributorData {
  name: String;
  email: String;
}
const AddProjectModal: React.FC<Props> = (props) => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [contributors, addContributor] = useState<Array<ContributorData>>([]);
  const [openAddContributorModal, setOpenAddContributorModal] = useState(false);
  const email = localStorage.getItem("email");
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      console.log("Received values of form: ", values);
      const response = await addProject(projectName, contributors, email || "");
      console.log(`Data > ${response}`);
      await Notify(`${projectName} added successfully!`, "success");
      props.refreshData && props.refreshData();
      props.closeModal();
    } catch (err: any) {
      let message = "Unable to Signup User";
      if (err?.response) {
        message = err?.response?.data?.message;
        console.log(err?.response.data?.message); // => the response payload
      }
      Notify(message, "error");
    } finally {
      setLoading(false);
    }
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
  };

  return (
    <Modal {...props}>
      <FormContainer>
        <HeaderHeading>Add New Project</HeaderHeading>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="projectName"
            rules={[
              {
                required: true,
                message: "Please enter Project Name!",
              },
            ]}
          >
            <Input
              value={projectName}
              placeholder={"Please enter Project Name"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProjectName(e.target.value)
              }
            />
          </Form.Item>
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
              disabled={projectName === ""}
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

export default React.memo(AddProjectModal);
