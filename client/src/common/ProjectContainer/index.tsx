import React from "react";
import moment from "moment";
import { FaUsers } from "react-icons/fa";
import { BsCalendarCheck } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";
import { Avatar, Dropdown } from "src/components";
import { MenuItemsProp } from "src/components/Dropdown";
import { BiWorld } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  ProjectContainerWrapper,
  ProjectNameSection,
  InnerSection,
  InfoBar,
} from "./projectContainer.style";

export interface Props {
  data: {
    projectDetail: {
      name: string;
    };
    contributor: Array<any>;
    created_at: Date;
    updated_at: Date;
  };
}
const ProjectContainer: React.FC<Props> = ({ data }) => {
  const projectMenu: Array<MenuItemsProp> = [
    {
      label: "open",
      onClick: () => console.log("Open!!"),
    },
  ];
  console.log("data >", data);
  const { projectDetail, contributor, created_at, updated_at } = data;
  const { name } = projectDetail;
  const createdAt = moment(created_at).format("MMMM Do YYYY");
  const updatedAt = moment(updated_at).format("MMMM Do YYYY");
  return (
    <ProjectContainerWrapper>
      <ProjectNameSection>
        <div>
          <BiWorld className="project-svg" />
          <div>{name}</div>
        </div>
        <div>
          <Dropdown
            placement="bottomRight"
            menuItems={projectMenu}
            trigger={["click"]}
          >
            <BiDotsVerticalRounded />
          </Dropdown>
        </div>
      </ProjectNameSection>
      <Avatar title={name}>{name.charAt(0)}</Avatar>
      <InnerSection>
        <InfoBar>
          <div className="flex">
            <BiUserCircle /> <span>Creator</span>
          </div>
          <div>Self</div>
        </InfoBar>
        <InfoBar>
          <div className="flex">
            <FaUsers /> <span>Contributors</span>
          </div>
          <div>{contributor.length}</div>
        </InfoBar>
        <InfoBar>
          <div className="flex">
            <BsCalendarCheck /> <span>Created At</span>
          </div>
          <div>{createdAt.toString()}</div>
        </InfoBar>
        <InfoBar>
          <div className="flex">
            <BsCalendar3 /> <span>Updated At</span>
          </div>
          <div>{updatedAt.toString()}</div>
        </InfoBar>
      </InnerSection>
    </ProjectContainerWrapper>
  );
};

export default ProjectContainer;
