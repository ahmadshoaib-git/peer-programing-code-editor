import React from "react";
import AvatarGroup from "../AvatarGroup";
import { HeaderHeading, HeaderWrapper } from "./header.style";
const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderHeading>CodePeer</HeaderHeading>
      <AvatarGroup />
    </HeaderWrapper>
  );
};

export default Header;
