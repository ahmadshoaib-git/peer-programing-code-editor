import React, { useState, useEffect } from "react";
import { Modal } from "src/components";
import { BiWorld } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";
import {
  FormContainer,
  HeaderHeading,
  ContributorHeadingWrapper,
  ListWrapper,
  CustomModalList,
  CustomEmpty,
  InfoList,
} from "./projectDetailModal.style";

export interface Props {
  title: string;
  isModalVisible: boolean;
  closeModal: () => void;
  data: any;
}
export interface ContributorData {
  name: String;
  email: String;
}
const ProjectDetailsModal: React.FC<Props> = (props) => {
  const [projectName, setProjectName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [contributors, addContributor] = useState<Array<ContributorData>>([]);

  useEffect(() => {
    try {
      const { data } = props;
      const tempContributor = data?.contributor?.map((obj: any) => {
        return {
          name: obj.name,
          email: obj.email,
        };
      });
      addContributor(tempContributor);
      setProjectName(data.projectDetail.name);
      setOwnerName(data.ownerName);
      setOwnerEmail(data.ownerEmail);
    } catch (err) {
      console.log(`err >${err}`);
    }
  }, [props?.data]);

  return (
    <Modal {...props}>
      <FormContainer>
        <HeaderHeading>
          <BiWorld />
          Project Details
        </HeaderHeading>
        {/* <Input value={projectName} disabled={true} />
        <Input value={ownerName} disabled={true} />
        <Input value={ownerEmail} disabled={true} /> */}
        <InfoList>
          <li>
            <span className="flex">
              <BiWorld /> Project Name:
            </span>
            <span className="highlight">{projectName}</span>
          </li>
          <li>
            <span className="flex">
              <BiUserCircle /> Owner Name:
            </span>
            <span className="highlight">{ownerName}</span>
          </li>
          <li>
            <span className="flex">
              <HiOutlineMail /> Owner Email:
            </span>
            <span className="highlight">{ownerEmail}</span>
          </li>
        </InfoList>
        <ContributorHeadingWrapper>
          <h3>
            <FaUsers />
            Project Contributors
          </h3>
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
                </li>
              ))}
            </CustomModalList>
          ) : (
            <CustomEmpty description="No contributor added." />
          )}
        </ListWrapper>
      </FormContainer>
    </Modal>
  );
};

export default React.memo(ProjectDetailsModal);
