import styled from "styled-components";
import { Dropdown, Menu } from "antd";

export const CustomDropdown = styled(Dropdown)``;

export const CustomMenu = styled(Menu)`
  min-width: 7rem;

  .ant-dropdown-menu,
  .ant-dropdown-menu-item {
    li,
    span,
    a {
      &:hover {
        color: ${({ theme: { colors } }) => colors.headingColor};
      }
    }
  }
`;
