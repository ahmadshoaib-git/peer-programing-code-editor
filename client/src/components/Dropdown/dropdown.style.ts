import styled from "styled-components";
import { Dropdown, Menu } from "antd";

export const CustomDropdown = styled(Dropdown)``;

export const CustomMenu = styled(Menu)`
  min-width: 7rem;

  .ant-dropdown-menu,
  .ant-dropdown-menu-item {
    &:hover {
      background: rgba(2, 122, 255, 0.06);
    }
    li,
    span,
    a {
      font-family: ${({ theme: { fonts } }) => fonts.primary};
      font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
      &:hover {
        color: ${({ theme: { colors } }) => colors.headingColor};
      }
    }
  }
`;
