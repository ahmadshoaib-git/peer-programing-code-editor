import styled from "styled-components";
import { Tabs, Button } from "antd";
const { TabPane } = Tabs;

export const CustomTabs = styled(Tabs)`
  width: 100%;
  font-family: ${({ theme: { fonts } }) => fonts.primary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
  /* > .ant-tabs-content-holder div {
    font-family: ${({ theme: { fonts } }) => fonts.primary};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
  }
  > .ant-tabs-nav {
    font-family: ${({ theme: { fonts } }) => fonts.primary};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
  } */
  .ant-tabs-tab {
    font-family: ${({ theme: { fonts } }) => fonts.primary};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
  }
`;

export const CustomTabPane = styled(TabPane)`
  font-family: ${({ theme: { fonts } }) => fonts.primary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
`;
