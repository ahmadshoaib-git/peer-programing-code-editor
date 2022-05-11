import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import IconButton from "../IconButton";
import AvatarGroup from "../AvatarGroup";
import {
  HeaderHeading,
  HeaderWrapper,
  HeaderRightSection,
} from "./header.style";
const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderHeading>CodePeer</HeaderHeading>
      <HeaderRightSection>
        <AvatarGroup />
        <IconButton title={"Settings"}>
          <BiDotsVerticalRounded />
        </IconButton>
      </HeaderRightSection>
    </HeaderWrapper>
  );
};

export default Header;
