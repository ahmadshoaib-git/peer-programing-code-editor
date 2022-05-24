import React from "react";
import ProjectContainer from "../ProjectContainer";
import { MyProjectsWrapper } from "./myProjects.style";

export interface Props {
  data: Array<any>;
  owner: "self" | "else";
}
const MyProjects: React.FC<Props> = ({ data, owner = "else" }) => {
  return (
    <MyProjectsWrapper>
      {data.map((project, index) => (
        <ProjectContainer key={index.toString()} data={project} owner={owner} />
      ))}
    </MyProjectsWrapper>
  );
};

export default MyProjects;
