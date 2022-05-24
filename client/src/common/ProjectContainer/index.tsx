import React from "react";
import { useNavigate } from "react-router-dom";
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
  owner: "self" | "else";
  data: {
    projectDetail: {
      name: string;
    };
    contributor: Array<any>;
    ownerName: string;
    ownerEmail: string;
    created_at: Date;
    updated_at: Date;
    _id: string;
  };
}
const ProjectContainer: React.FC<Props> = ({ data, owner }) => {
  let navigate = useNavigate();
  const {
    projectDetail,
    contributor,
    created_at,
    updated_at,
    _id,
    ownerName,
    ownerEmail,
  } = data;
  const projectMenu: Array<MenuItemsProp> = [
    {
      label: "open",
      onClick: () => {
        console.log("Open!!");
        navigate(`/editor/${_id}`);
      },
    },
  ];
  const { name } = projectDetail;
  let avatarName;
  if (name.split(" ").length > 1) {
    const temp = name.split(" ");
    avatarName = `${temp[0].charAt(0).toUpperCase()}${temp[1]
      .charAt(0)
      .toUpperCase()}`;
  } else {
    avatarName = `${name.charAt(0).toUpperCase()}${name
      .charAt(1)
      .toUpperCase()}`;
  }
  const createdAt = moment(created_at).format("MMMM Do YYYY");
  const updatedAt = moment(updated_at).format("MMMM Do YYYY");
  const getCreator = () => {
    if (owner === "self") return owner;
    else return ownerName;
  };
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
      <Avatar title={name}>{avatarName}</Avatar>
      <InnerSection>
        <InfoBar>
          <div className="flex">
            <BiUserCircle /> <span>Creator</span>
          </div>
          <div className="highlighter">{getCreator()}</div>
        </InfoBar>
        <InfoBar>
          <div className="flex">
            <FaUsers /> <span>Contributors</span>
          </div>
          <div className="highlighter">{contributor?.length || "-"}</div>
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
