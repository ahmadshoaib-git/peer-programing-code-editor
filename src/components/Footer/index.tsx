import React from "react";
import { AppYear, version } from "src/utils";
import { FooterWrapper } from "./footer.style";

const Footer = () => {
  const footerText = `© ${AppYear()} CodePeer, Inc. All rights reserved. v ${version}`;
  return <FooterWrapper>{footerText}</FooterWrapper>;
};

export default Footer;
