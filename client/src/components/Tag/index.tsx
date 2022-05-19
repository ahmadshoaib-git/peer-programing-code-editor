import React from "react";
import { CustomTag } from "./tag.style";

export interface Props {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
  color?:
    | "magenta"
    | "red"
    | "volcano"
    | "orange"
    | "gold"
    | "lime"
    | "green"
    | "cyan"
    | "blue"
    | "geekblue"
    | "purple";
}

const Tag: React.FC<Props> = ({ children, color }) => {
  return <CustomTag color={color}>{children}</CustomTag>;
};

export default Tag;
