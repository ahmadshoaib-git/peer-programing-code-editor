import React from "react";
import { Footer, Header, Main, OuterSidebar } from "src/components";
import {
  LayoutWrapper,
  OuterSideBarWrapper,
  InnerLayoutWrapper,
} from "./layout.style";
export interface Props {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <LayoutWrapper>
      <OuterSideBarWrapper>
        <OuterSidebar />
      </OuterSideBarWrapper>
      <InnerLayoutWrapper>
        <Header />
        <Main children={children} />
        <Footer />
      </InnerLayoutWrapper>
    </LayoutWrapper>
  );
};

export default Layout;
