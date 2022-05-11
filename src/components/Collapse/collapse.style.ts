import styled from "styled-components";
import { Collapse } from "antd";
const { Panel } = Collapse;

export const CustomCollapse = styled(Collapse)`
  .ant-collapse {
    background: #348dd633;
  }
  .ant-collapse-header {
    padding: 0.4rem !important;
    font-family: ${({ theme: { fonts } }) => fonts.secondary};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.subHeading};
    /* background: #348dd633; */
    background: #fff;
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
  }
`;

export const CustomPanel = styled(Panel)``;
