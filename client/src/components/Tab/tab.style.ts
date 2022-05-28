import styled, { css } from "styled-components";
import { Tabs, Button } from "antd";
import { TabsProps } from "antd/lib/tabs";
const { TabPane } = Tabs;

interface TabDataProp extends TabsProps {
  isEmpty?: boolean;
}

const AntTabEmptyStyles = css`
  .ant-tabs-content {
    height: 100%;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

export const CustomTabs = styled(Tabs)<TabDataProp>`
  width: 100%;
  font-family: ${({ theme: { fonts } }) => fonts.primary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
  /* padding-right: 1rem; */
  display: flex;
  align-items: center;
  .ant-tabs-tab {
    font-family: ${({ theme: { fonts } }) => fonts.primary};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
  }
  .ant-tabs-nav {
    /* padding-right: 1rem; */
    height: 2rem;
    width: 100%;
  }
  .ant-tabs-content-holder {
    height: calc(100% - 2rem);
    overflow-y: auto;
    /* .ant-tabs-content {
      height: 100%;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
    } */
    ${(props) => props.isEmpty && AntTabEmptyStyles}
  }
  .apply-styles {
    height: calc(100% - 2rem);
    overflow-y: auto;
    .ant-tabs-content {
      height: 100%;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const CustomTabPane = styled(TabPane)`
  font-family: ${({ theme: { fonts } }) => fonts.primary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
`;
