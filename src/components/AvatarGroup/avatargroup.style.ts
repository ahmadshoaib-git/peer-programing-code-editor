import styled from "styled-components";
import { Avatar } from "antd";

export const CustomAvatar = styled(Avatar)`
  height: 2rem;
  width: 2rem;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.subHeading};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .alias {
    text-transform: uppercase;
    font-weight: 600;
    font-family: ${({ theme: { fonts } }) => fonts.primary};
  }
  .ant-popover-inner-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
