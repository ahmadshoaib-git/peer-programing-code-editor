import styled from "styled-components";
import { Tabs, Button } from "antd";
const { TabPane } = Tabs;

export const CustomTabs = styled(Tabs)`
  width: 100%;
  font-family: ${({ theme: { fonts } }) => fonts.primary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
  padding-right: 1rem;
  display: flex;
  align-items: center;
  .ant-tabs-tab {
    font-family: ${({ theme: { fonts } }) => fonts.primary};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
  }
  .ant-tabs-nav {
    height: 2rem;
    width: 100%;
  }
  .ant-tabs-content-holder {
    height: calc(100% - 2rem);
    overflow-y: auto;
  }
`;

export const CustomTabPane = styled(TabPane)`
  font-family: ${({ theme: { fonts } }) => fonts.primary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
`;
