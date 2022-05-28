import React, { useState, useEffect } from "react";
import { Modal } from "src/components";
import { FaUsers } from "react-icons/fa";
import {
  FormContainer,
  HeaderHeading,
  ListWrapper,
  CustomModalList,
  CustomEmpty,
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

export default React.memo(ContributorDetailModal);
