import React from "react";
import { CustomSidebar } from "./sidebar.style";

export interface Props {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
}

const Sidebar: React.FC<Props> = ({ children }) => {
  return <CustomSidebar>{children}</CustomSidebar>;
};

export default Sidebar;
// content
