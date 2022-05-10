import React from "react";
import { CustomIconBtn, CustomTooltip } from "./iconButton.style";
export interface Props {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
  title: string;
}

const IconButton: React.FC<Props> = ({ children, title = "" }) => {
  return (
    <CustomTooltip title={title} key={title} placement="left" overlay="">
      <CustomIconBtn>{children}</CustomIconBtn>
    </CustomTooltip>
  );
};

export default IconButton;
