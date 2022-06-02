import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";
import IconButton from "../IconButton";
import AvatarGroup from "../AvatarGroup";
import Dropdown from "../Dropdown";
import { setLoggedIn } from "src/redux/slices/auth";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const headerMenu: Array<MenuItemsProp> = [
    {
      label: "logout",
      onClick: async () => {
        await localStorage.clear();
        await dispatch(setLoggedIn({ loggedIn: false }));
        console.log("Logout");
        navigate(`/login`);
      },
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

export default React.memo(Header);
