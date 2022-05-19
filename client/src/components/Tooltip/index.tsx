import React from "react";
import { CustomTooltip } from "./tooltip.style";

export interface Props {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
  title:
    | React.ReactFragment
    | string
    | number
    | boolean
    | null
    | JSX.Element
    | JSX.Element[];
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
    | "rightBottom"
    | any;
}
const Tooltip: React.FC<Props> = ({ children, placement = "", title = "" }) => {
  return (
    <CustomTooltip title={title} placement={placement} overlay={<>{title}</>}>
      {children}
    </CustomTooltip>
  );
};

export default Tooltip;
