import styled from "styled-components";
import { Button, Tooltip } from "antd";

export const CustomIconBtn = styled(Button)`
  background-color: ${({ theme: { colors } }) => colors.white};
  height: ${({ theme: { layout } }) => layout.iconButton.height};
  width: ${({ theme: { layout } }) => layout.iconButton.width};
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
    background-color: ${({ theme: { colors } }) => colors.tooltipBackground};
    color: ${({ theme: { colors } }) => colors.tooltipColor};
    svg {
      font-weight: 900 !important;
    }
  }
  svg {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.icon};
  }
`;
