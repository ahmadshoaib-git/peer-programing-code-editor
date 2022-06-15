import React, { useEffect, useState } from "react";
import { Tab, IconButton } from "src/components";
import { FiFolderPlus } from "react-icons/fi";
import { getProjects, getContributedProjects } from "./service";
import { Layout, ProjectsList, AddProjectModal } from "src/common";
import { MainWrapper, SpanWrapper } from "./EditorMain.style";
const EditorMain = () => {
  const [tabIndex, setTabIndex] = useState("0");
  const [openAddProjectModal, setOpenAddProjectModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const tabNames = ["My Projects", "Contributing Projects", "Invited Projects"];
  const userEmail = localStorage.getItem("email") || "";
  useEffect(() => {
    getTabProjectsData();
  }, [userEmail, tabIndex]);
  const getTabProjectsData = () => {
    switch (tabIndex.toString()) {
      case "0":
        return fetchProjectData(userEmail || "");
      case "1":
        return fetchContributedProjects(userEmail || "");
      case "2":
        return fetchContributedProjects(userEmail || "");
      default:
        return fetchProjectData(userEmail || "");
    }
  };
  const fetchProjectData = async (email: String) => {
    const response = await getProjects(email);
    setProjects(response.data);
  };
  const fetchContributedProjects = async (email: String) => {
    const response = await getContributedProjects(email);
    setProjects(response.data);
  };
  const getTabData = () => {
    switch (tabIndex) {
      case "0":
        return <ProjectsList data={projects} owner="self" />;
      case "1":
        return <ProjectsList data={projects} owner="else" />;
      case "2":
        return <ProjectsList data={projects} owner="else" />;
      default:
        return <ProjectsList data={projects} owner="self" />;
    }
  };
  const createNewProject = () => {
    return (
      <SpanWrapper onClick={() => setOpenAddProjectModal(true)}>
        <IconButton title={"Create Project"}>
          <FiFolderPlus />
        </IconButton>
      </SpanWrapper>
    );
  };
  return (
    <Layout>
      <MainWrapper>
        <Tab
          tabs={tabNames}
          selectedTabIndex={tabIndex}
          onChange={(i) => setTabIndex(i)}
          tabEndOption={createNewProject()}
          isEmpty={projects.length === 0}
        >
          {getTabData()}
        </Tab>
      </MainWrapper>
      <AddProjectModal
        title=""
        isModalVisible={openAddProjectModal}
        closeModal={() => setOpenAddProjectModal(false)}
        refreshData={() => getTabProjectsData()}
      />
    </Layout>
  );
};

export default EditorMain;
