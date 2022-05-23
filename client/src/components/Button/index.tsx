import React from "react";
import { CustomButton } from "./button.style";

// export interface Props {
//   children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
// }
// const Button: React.FC<Props> = ({ children }) => {
const Button = (Props: any) => {
  return <CustomButton {...Props}>{Props.children}</CustomButton>;
};

export default Button;
