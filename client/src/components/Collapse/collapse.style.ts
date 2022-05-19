import styled from "styled-components";
import { Collapse } from "antd";
const { Panel } = Collapse;

export const CustomCollapse = styled(Collapse)`
  border-right: 0.1rem solid #348dd633;
  /* box-shadow: inset -1px 0px #348dd633; */
  .ant-collapse {
    background: #348dd633;
  }
  .ant-collapse-content {
    border-top: 0.1rem solid #348dd633;
  }
  .ant-collapse-header {
    padding: 0.4rem !important;
    font-family: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
    color: ${({ theme: { colors } }) => colors.black}!important;
    background: ${({ theme: { colors } }) => colors.white}!important;
    font-weight: 500;
    &:hover {
      background: ${({ theme: { colors } }) => colors.tooltipBackground};
      color: ${({ theme: { colors } }) => colors.tooltipColor}!important;
    }
    &:first-child {
      svg {
        margin-right: 0.3rem !important;
      }
    }
  }
  .ant-collapse-item {
    border: 0;
    border-bottom: 0.1rem solid #348dd633;
    font-family: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
    color: ${({ theme: { colors } }) => colors.black}!important;
  }
`;

export const CustomPanel = styled(Panel)``;
