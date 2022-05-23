import React, { useEffect } from "react";
import { Tab } from "src/components";
import { getProjects } from "./service";
import {
  Layout,
  MyProjects,
  ContributingProjects,
  InvitedProjects,
} from "src/common";
import { MainWrapper } from "./EditorMain.style";
const EditorMain = () => {
  const [tabIndex, setTabIndex] = React.useState("0");
  const [projects, setProjects] = React.useState([]);
  const tabNames = ["My Projects", "Contributing Projects", "Invited Projects"];
  const userEmail = localStorage.getItem("email");
  useEffect(() => {
    fetchProjectData(userEmail || "");
  }, [userEmail]);
  const fetchProjectData = async (email: String) => {
    const response = await getProjects(email);
    console.log(response);
  };
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
