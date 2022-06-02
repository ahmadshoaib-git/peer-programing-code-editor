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
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  return (
    <OuterSidebarWrapper>
      <OuterSidebarTop>
        <IconButton title="Explorer">
          <VscCode />
        </IconButton>
      </OuterSidebarTop>
      <OuterSidebarMiddle>
        {middleOuterBarIcons?.map((obj, key) => (
          <React.Fragment key={key.toString()}>
            <IconButton title={obj.title}>{obj.icon}</IconButton>
          </React.Fragment>
        ))}
      </OuterSidebarMiddle>
      <OuterSidebarFooter>
        <div>
          <Avatar hasBadge={true} title={name || "User"} placement="right">
            {email?.toLocaleUpperCase().charAt(0) || "U"}
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
