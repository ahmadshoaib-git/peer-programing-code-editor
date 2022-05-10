import styled from "styled-components";
import { Button, Tooltip } from "antd";

export const CustomIconBtn = styled(Button)`
  background-color: ${({ theme: { colors } }) => colors.white};
  height: 2rem;
  width: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border-radius: 0.3rem;
`;

export const CustomTooltip = styled(Tooltip)`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
  border: 0;
  outline: 0;
  &:hover {
    background-color: ${({ theme: { colors } }) => colors.tooltipColor};
    color: ${({ theme: { colors } }) => colors.white};
    font-weight: 900;
    .ant-tooltip-inner {
      font-size: ${({ theme: { fontSizes } }) =>
        fontSizes.paragraph} !important;
    }
  }
  svg {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.icon};
  }
`;
