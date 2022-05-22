import React from "react";
import { CustomButton } from "./button.style";

export interface Props {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
}
const Button: React.FC<Props> = ({ children }) => {
  return (
    <CustomButton type="primary" htmlType="submit" name="Submit">
      {children}
    </CustomButton>
  );
};

export default Button;
