import React from "react";
import Sidebar from "../Sidebar";
import { MainWrapper } from "./main.style";
export interface Props {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
}

const Main: React.FC<Props> = ({ children }) => {
  return (
    <MainWrapper>
      <Sidebar />
      <div>{children}</div>
    </MainWrapper>
  );
};

export default Main;
