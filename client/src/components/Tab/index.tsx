import React from "react";
import { CustomTabs, CustomTabPane } from "./tab.style";

const operations = <>Extra Action</>;

export interface Props {
  onChange?: (arg0: string) => void;
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
  tabEndOption?:
    | React.ReactNode
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
  tabs: string[];
  selectedTabIndex: string;
  isEmpty?: boolean;
}

const Tab: React.FC<Props> = ({
  tabs,
  children,
  tabEndOption,
  onChange,
  selectedTabIndex,
  isEmpty = false,
}) => {
  return (
    <>
      <CustomTabs
        tabBarExtraContent={tabEndOption}
        onChange={onChange}
        activeKey={selectedTabIndex}
      >
        {tabs.map((tab, index) => (
          <CustomTabPane
            tab={tab}
            key={index.toString()}
            className="apply-styles"
          >
            {children}
          </CustomTabPane>
        ))}
      </CustomTabs>
    </>
  );
};

export default Tab;
