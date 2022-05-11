import React from "react";
import Tooltip from "../Tooltip";
import { CustomAvatar } from "./avatar.style";
export interface Props {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
  title?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
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
}) => {
  return (
    <>
      {title === "" ? (
        <CustomAvatar shape="square">{children}</CustomAvatar>
      ) : (
        <Tooltip title={title} placement={placement}>
          <CustomAvatar shape="square">{children}</CustomAvatar>
        </Tooltip>
      )}
    </>
  );
};
export default Avatar;
