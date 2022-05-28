import React from "react";
import { Modal } from "src/components";
import AddContributorModal from "./Forms/addContributorModal";
import EditContributorModal from "./Forms/addProjectForm";
export interface Props {
  title: string;
  isModalVisible: boolean;
  closeModal: () => void;
  saveContributors: (data: any) => void;
  contributors?: any;
}
const EditContributor: React.FC<Props> = (props) => {
  return <EditContributorModal {...props} />;
};

export default EditContributor;
