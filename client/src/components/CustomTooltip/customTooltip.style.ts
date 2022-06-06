import styled from "styled-components";
import { Button, Tooltip } from "antd";

export const CustomTooltip = styled(Tooltip)`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
  border: 0;
  outline: 0;
  /* &:hover {
    background-color: ${({ theme: { colors } }) => colors.tooltipBackground};
    color: ${({ theme: { colors } }) => colors.tooltipColor};
  } */
`;
