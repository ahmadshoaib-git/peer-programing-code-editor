import React from "react";
import { Tab } from "src/components";
import {
  Layout,
  MyProjects,
  ContributingProjects,
  InvitedProjects,
} from "src/common";
import { MainWrapper } from "./EditorMain.style";
const EditorMain = () => {
  const [tabIndex, setTabIndex] = React.useState("0");
  const tabNames = ["My Projects", "Contributing Projects", "Invited Projects"];
  const getTabData = () => {
    switch (tabIndex) {
      case "0":
        return <MyProjects />;
      case "1":
        return <ContributingProjects />;
      case "2":
        return <InvitedProjects />;
      default:
        return <MyProjects />;
    }
  };
  return (
    <Layout>
      <MainWrapper>
        <Tab
          tabs={tabNames}
          selectedTabIndex={tabIndex}
          onChange={(i) => setTabIndex(i)}
        >
          {getTabData()}
        </Tab>
      </MainWrapper>
    </Layout>
  );
};

export default EditorMain;
