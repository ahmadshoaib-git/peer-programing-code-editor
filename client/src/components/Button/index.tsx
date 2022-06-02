import React from "react";
import { CustomButton } from "./button.style";

const Button = (Props: any) => {
  return <CustomButton {...Props}>{Props.children}</CustomButton>;
};

export default Button;
