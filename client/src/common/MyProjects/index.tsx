import React from "react";
import ProjectContainer from "../ProjectContainer";
import { MyProjectsWrapper } from "./myProjects.style";

export interface Props {
  data: Array<any>;
}
const MyProjects: React.FC<Props> = ({ data }) => {
  return (
    <MyProjectsWrapper>
      {data.map((project, index) => (
        <ProjectContainer key={index.toString()} data={project} />
      ))}
    </MyProjectsWrapper>
  );
};

export default MyProjects;
