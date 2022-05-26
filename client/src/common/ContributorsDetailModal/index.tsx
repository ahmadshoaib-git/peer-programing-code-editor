import React, { useState, useEffect } from "react";
import { HiUserAdd } from "react-icons/hi";
import { Button, Input, Notify, Modal, IconButton } from "src/components";
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
} from "./contributorDetailModal.style";

export interface Props {
  title: string;
  isModalVisible: boolean;
  closeModal: () => void;
  contributors: any;
}
export interface ContributorData {
  name: String;
  email: String;
}
const ContributorDetailModal: React.FC<Props> = (props) => {
  const [contributors, addContributor] = useState<Array<ContributorData>>([]);

  console.log("props ============>>>>>", props);
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
  }, [props?.contributors]);

  return (
    <Modal {...props}>
      <FormContainer>
        <HeaderHeading>
          <FaUsers /> Project Contributors
        </HeaderHeading>
        {/* <Input value={projectName} disabled={true} />
        <Input value={ownerName} disabled={true} />
        <Input value={ownerEmail} disabled={true} /> */}
        {/* <InfoList>
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
        </ContributorHeadingWrapper> */}
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

export default ContributorDetailModal;
