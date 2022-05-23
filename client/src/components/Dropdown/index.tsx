import React from "react";
import { CustomDropdown, CustomMenu } from "./dropdown.style";

export interface MenuItemsProp {
  label: string;
  onClick: () => void;
}

export interface Props {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
  placement?:
    | "bottomLeft"
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "bottomCenter"
    | "bottomRight"
    | "top"
    | "bottom";
  menuItems: Array<MenuItemsProp>;
  trigger?: ("contextMenu" | "hover" | "click")[];
}

const menu = (
  <CustomMenu
    items={[
      {
        key: "1",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            1st menu item
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            2nd menu item
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            3rd menu item
          </a>
        ),
      },
    ]}
  />
);
const getMenuItems = (menuItems: Array<MenuItemsProp>) => {
  return menuItems.map((item: MenuItemsProp, index: number) => {
    return {
      key: index.toString(),
      label: item.label,
      onClick: item.onClick,
    };
  });
};
const Dropdown: React.FC<Props> = ({
  children,
  placement,
  menuItems,
  trigger = ["hover"],
}) => {
  return (
    <CustomDropdown
      overlay={<CustomMenu items={getMenuItems(menuItems)} />}
      placement={placement}
      trigger={trigger}
    >
      {children}
    </CustomDropdown>
  );
};

export default Dropdown;
