import React from "react";
import Tooltip from "../Tooltip";
import { CustomAvatar, CustomBadge } from "./avatar.style";
export interface Props {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
  title?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
  hasBadge?: boolean;
  badgeCount?: number;
  placement?:
    | "top"
    | "left"
    | "right"
    | "bottom"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "leftTop"
    | "leftBottom"
    | "rightTop"
    | "rightBottom";
}

const Avatar: React.FC<Props> = ({
  children,
  title = "",
  placement = "right",
  hasBadge = false,
  badgeCount = 0,
}) => {
  const AvatarWithBadgeIcon = () => {
    if (title === "")
      return (
        <CustomBadge dot>
          <CustomAvatar shape="square">{children}</CustomAvatar>
        </CustomBadge>
      );
    else
      return (
        <CustomBadge dot>
          <Tooltip title={title} placement={placement}>
            <CustomAvatar shape="square">{children}</CustomAvatar>
          </Tooltip>
        </CustomBadge>
      );
  };
  const AvatarWithBadge = () => {
    if (title === "")
      return (
        <CustomBadge count={badgeCount}>
          <CustomAvatar shape="square">{children}</CustomAvatar>
        </CustomBadge>
      );
    else
      return (
        <CustomBadge count={badgeCount}>
          <Tooltip title={title} placement={placement}>
            <CustomAvatar shape="square">{children}</CustomAvatar>
          </Tooltip>
        </CustomBadge>
      );
  };
  const AvatarWithoutBadge = () => {
    // if (title === "")
    return <CustomAvatar shape="square">{children}</CustomAvatar>;
    // else
    //   return (
    //     <Tooltip title={title} placement={placement}>
    //       <CustomAvatar shape="square">{children}</CustomAvatar>
    //     </Tooltip>
    //   );
  };
  const getAvatar = () => {
    if (hasBadge) {
      if (badgeCount > 0) {
        return AvatarWithBadge();
      } else {
        return AvatarWithBadgeIcon();
      }
    } else {
      return AvatarWithoutBadge();
    }
  };
  return <>{getAvatar()}</>;
};
export default Avatar;
