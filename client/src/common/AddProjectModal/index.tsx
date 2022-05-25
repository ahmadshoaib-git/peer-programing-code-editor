import React from "react";
import { Modal } from "src/components";
import AddContributorModal from "./Forms/addContributorModal";
import AddProjectModal from "./Forms/addProjectForm";
export interface Props {
  title: string;
  isModalVisible: boolean;
  closeModal: () => void;
  refreshData: () => void;
}
const ProjectModal: React.FC<Props> = (props) => {
  return <AddProjectModal {...props} />;
  //   return <AddContributorModal {...props} />;
};

export default ProjectModal;
