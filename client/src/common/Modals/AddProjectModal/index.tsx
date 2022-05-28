import React from "react";
import AddProjectModal from "./Forms/addProjectForm";
export interface Props {
  title: string;
  isModalVisible: boolean;
  closeModal: () => void;
  refreshData: () => void;
}
const ProjectModal: React.FC<Props> = (props) => {
  return <AddProjectModal {...props} />;
};

export default ProjectModal;
