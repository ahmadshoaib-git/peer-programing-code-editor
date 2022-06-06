import React from "react";
import { CustomTooltip } from "./customTooltip.style";
// import { TooltipPlacement } from;
export interface Props {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
  title: string;
  //   placement?: TooltipPlacement;
}

const Tooltip: React.FC<Props> = ({
  children,
  title = "",
  //   placement = "left",
}) => {
  return (
    <CustomTooltip title={title} key={title} placement={"bottom"} overlay="">
      {children}
    </CustomTooltip>
  );
};

export default Tooltip;
