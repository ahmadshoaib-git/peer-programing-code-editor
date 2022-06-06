import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
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
  console.log(!sideBarContent);
  const { showEditorSideBar } = useSelector((state: RootState) => {
    return state.general;
  });

  const sideBarContentComp = showEditorSideBar && sideBarContent;
  return (
    <LayoutWrapper>
      <OuterSideBarWrapper>
        <OuterSidebar />
      </OuterSideBarWrapper>
      <InnerLayoutWrapper>
        <Header noSideBar={!sideBarContent} />
        <Main children={children} sideBarContent={sideBarContentComp} />
        <Footer />
      </InnerLayoutWrapper>
    </LayoutWrapper>
  );
};

export default React.memo(Layout);
