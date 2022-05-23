import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import IconButton from "../IconButton";
import AvatarGroup from "../AvatarGroup";
import Dropdown from "../Dropdown";
import { MenuItemsProp } from "src/components/Dropdown";
import {
  HeaderHeading,
  HeaderWrapper,
  HeaderRightSection,
} from "./header.style";
export interface Props {
  noSideBar: boolean;
}
const Header: React.FC<Props> = ({ noSideBar }) => {
  const headerMenu: Array<MenuItemsProp> = [
    {
      label: "logout",
      onClick: () => console.log("Logout"),
    },
  ];
  return (
    <HeaderWrapper>
      <HeaderHeading>CodePeer</HeaderHeading>
      <HeaderRightSection>
        {!noSideBar && <AvatarGroup />}
        <IconButton title={"Settings"}>
          <Dropdown placement="bottomRight" menuItems={headerMenu}>
            <BiDotsVerticalRounded />
          </Dropdown>
        </IconButton>
      </HeaderRightSection>
    </HeaderWrapper>
  );
};

export default Header;
