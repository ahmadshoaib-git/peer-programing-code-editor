import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import IconButton from "../IconButton";
import AvatarGroup from "../AvatarGroup";
import {
  HeaderHeading,
  HeaderWrapper,
  HeaderRightSection,
} from "./header.style";
export interface Props {
  noSideBar: boolean;
}
const Header: React.FC<Props> = ({ noSideBar }) => {
  return (
    <HeaderWrapper>
      <HeaderHeading>CodePeer</HeaderHeading>
      <HeaderRightSection>
        {!noSideBar && <AvatarGroup />}
        <IconButton title={"Settings"}>
          <BiDotsVerticalRounded />
        </IconButton>
      </HeaderRightSection>
    </HeaderWrapper>
  );
};

export default Header;
