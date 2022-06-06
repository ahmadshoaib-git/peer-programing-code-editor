import styled from "styled-components";
import { Modal, Button } from "antd";

export const CustomModal = styled(Modal)``;

export const CancelButtonWrapper = styled.span`
  svg {
    color: ${({ theme: { colors } }) => colors.black};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.heading};
    &:hover {
      path {
        color: ${({ theme: { colors } }) => colors.pink};
        fill: rgba(255, 20, 147, 1);
        stroke: rgba(255, 20, 147, 1);
      }
    }
  }
`;
