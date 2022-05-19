import styled from "styled-components";
import { Avatar, Badge } from "antd";

export const CustomAvatar = styled(Avatar)`
  height: ${({ theme: { layout } }) => layout.iconButton.height};
  width: ${({ theme: { layout } }) => layout.iconButton.width};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.subHeading};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const CustomBadge = styled(Badge)``;
