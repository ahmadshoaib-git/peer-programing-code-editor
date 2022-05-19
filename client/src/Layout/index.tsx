import React from "react";
import { Footer, Header, Main } from "src/components";
import OuterSidebar from "./OuterSidebar";
import {
  LayoutWrapper,
  OuterSideBarWrapper,
  InnerLayoutWrapper,
} from "./layout.style";
export interface Props {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
  sideBarContent?:
    | React.ReactNode
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
}

const Layout: React.FC<Props> = ({ children, sideBarContent }) => {
  return (
    <LayoutWrapper>
      <OuterSideBarWrapper>
        <OuterSidebar />
      </OuterSideBarWrapper>
      <InnerLayoutWrapper>
        <Header />
        <Main children={children} sideBarContent={sideBarContent} />
        <Footer />
      </InnerLayoutWrapper>
    </LayoutWrapper>
  );
};

export default Layout;
