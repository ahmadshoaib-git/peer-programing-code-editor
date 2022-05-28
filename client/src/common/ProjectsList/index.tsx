import React from "react";
import ProjectContainer from "../ProjectContainer";
import {
  MyProjectsWrapper,
  EmptyProjectWrapper,
  CustomEmpty,
} from "./myProjects.style";

export interface Props {
  data: Array<any>;
  owner: "self" | "else";
}
const ProjectsList: React.FC<Props> = ({ data, owner = "else" }) => {
  return (
    <>
      {data?.length > 0 ? (
        <MyProjectsWrapper>
          {data?.map((project, index) => (
            <ProjectContainer
              key={index.toString()}
              data={project}
              owner={owner}
            />
          ))}
        </MyProjectsWrapper>
      ) : (
        <EmptyProjectWrapper>
          <CustomEmpty />
        </EmptyProjectWrapper>
      )}
    </>
  );
};

export default React.memo(ProjectsList);
