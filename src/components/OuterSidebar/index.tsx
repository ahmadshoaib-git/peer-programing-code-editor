import React from "react";
import { VscMenu, VscCode } from "react-icons/vsc";
import IconButton from "../IconButton";
import Avatar from "../Avatar";
import { middleOuterBarIcons } from "./outerSidebar.config";
import {
  OuterSidebarWrapper,
  OuterSidebarTop,
  OuterSidebarMiddle,
  OuterSidebarFooter,
} from "./outerSidebar.style";
export interface Props {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
}

const OuterSidebar: React.FC<Props> = ({}) => {
  return (
    <OuterSidebarWrapper>
      <OuterSidebarTop>
        <IconButton title="Explorer">
          <VscCode />
        </IconButton>
      </OuterSidebarTop>
      <OuterSidebarMiddle>
        {middleOuterBarIcons?.map((obj) => (
          <IconButton title={obj.title}>{obj.icon}</IconButton>
        ))}
      </OuterSidebarMiddle>
      <OuterSidebarFooter>
        <div>
          <Avatar title="Ahmad Shoaib" placement="right">
            A
          </Avatar>
        </div>
        <IconButton title="Setting">
          <VscMenu />
        </IconButton>
      </OuterSidebarFooter>
    </OuterSidebarWrapper>
  );
};

export default OuterSidebar;
