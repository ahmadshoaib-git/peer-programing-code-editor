import React from "react";
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

const ProjectContainer = () => {
  const projectMenu: Array<MenuItemsProp> = [
    {
      label: "open",
      onClick: () => console.log("Open!!"),
    },
  ];
  return (
    <ProjectContainerWrapper>
      <ProjectNameSection>
        <div>
          <BiWorld className="project-svg" />
          <div>Project A</div>
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
      <Avatar title="Project X">P</Avatar>
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
          <div>10</div>
        </InfoBar>
        <InfoBar>
          <div className="flex">
            <BsCalendarCheck /> <span>Created At</span>
          </div>
          <div>May 10, 2022</div>
        </InfoBar>
        <InfoBar>
          <div className="flex">
            <BsCalendar3 /> <span>Updated At</span>
          </div>
          <div>May 20, 2022</div>
        </InfoBar>
      </InnerSection>
    </ProjectContainerWrapper>
  );
};

export default ProjectContainer;
