import React from "react";
import Sidebar from "../Sidebar";
export interface Props {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
}

const Main: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div>{children}</div>
    </>
  );
};

export default Main;
