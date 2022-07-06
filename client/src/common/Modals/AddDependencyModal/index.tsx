import React from "react";
import { Modal } from "src/components";
import {
  FormContainer,
  HeaderHeading,
  ContentWrapper,
} from "./confirmationModal.style";

export interface Props {
  title: string;
  innerTitle: string;
  isModalVisible: boolean;
  closeModal: () => void;
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
  handleOkModal: () => void;
}

const AddDependencyModal: React.FC<Props> = (props) => {
  return (
    <Modal {...props}>
      <FormContainer>
        <HeaderHeading>{props.innerTitle}</HeaderHeading>
        <ContentWrapper>{props.children}</ContentWrapper>
      </FormContainer>
    </Modal>
  );
};

export default React.memo(AddDependencyModal);
