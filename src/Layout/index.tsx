import React from "react";
import { Footer, Header, Main } from "src/components";
export interface Props {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <Main children={children} />
      <Footer />
    </div>
  );
};

export default Layout;
