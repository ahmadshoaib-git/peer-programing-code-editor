import styled from "styled-components";
import { Avatar } from "antd";

export const CustomAvatar = styled(Avatar)`
  height: ${({ theme: { layout } }) => layout.iconButton.height};
  width: ${({ theme: { layout } }) => layout.iconButton.width};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.subHeading};
  display: flex;
  justify-content: center;
  align-items: center;
`;
