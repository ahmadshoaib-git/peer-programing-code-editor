import React from "react";
import { VscMenu, VscCode } from "react-icons/vsc";
import IconButton from "src/components/IconButton";
import Avatar from "src/components/Avatar";
import { middleOuterBarIcons } from "./outerSidebar.config";
import {
  OuterSidebarWrapper,
  OuterSidebarTop,
  OuterSidebarMiddle,
  OuterSidebarFooter,
} from "./outerSidebar.style";

const OuterSidebar = () => {
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
          <Avatar hasBadge={true} title="Ahmad Shoaib" placement="right">
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
