import React from "react";
import EditorSideBar from "./EditorSideBar";
import Layout from "src/Layout";

const Editor = () => {
  return (
    <Layout sideBarContent={<EditorSideBar />}>
      <div>Editor</div>
    </Layout>
  );
};

export default Editor;
