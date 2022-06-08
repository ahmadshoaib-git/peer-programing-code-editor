import React, { useState } from "react";
import { GrFormClose, GrAd } from "react-icons/gr";
import { CustomModal, CancelButtonWrapper } from "./modal.style";

export interface Props {
  title: string;
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
  isModalVisible: boolean;
  closeModal: () => void;
  handleOkModal?: () => void;
}

const Modal: React.FC<Props> = ({
  title = "",
  children,
  isModalVisible = false,
  closeModal,
  handleOkModal = null,
}) => {
  const handleOk = () => {
    if (handleOkModal) handleOkModal();
    else closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <>
      <CustomModal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
        closeIcon={
          <CancelButtonWrapper>
            <GrFormClose />
          </CancelButtonWrapper>
        }
      >
        {children}
      </CustomModal>
    </>
  );
};

export default Modal;
