import React from "react";
// import { Tabs, Button } from 'antd';

// const { TabPane } = Tabs;
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
}

const Tab: React.FC<Props> = ({
  tabs,
  children,
  tabEndOption,
  onChange,
  selectedTabIndex,
}) => {
  return (
    <>
      <CustomTabs
        tabBarExtraContent={tabEndOption}
        onChange={onChange}
        activeKey={selectedTabIndex}
      >
        {tabs.map((tab, index) => (
          <CustomTabPane tab={tab} key={index.toString()}>
            {children}
          </CustomTabPane>
        ))}
      </CustomTabs>
    </>
  );
};

export default Tab;
