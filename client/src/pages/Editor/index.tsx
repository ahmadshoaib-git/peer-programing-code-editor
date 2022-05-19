import React from "react";
import Layout from "src/Layout";
import EditorSideBar from "./EditorSideBar";
import { CodeEditor } from "src/components";

const Editor = () => {
  return (
    <Layout sideBarContent={<EditorSideBar />}>
      <CodeEditor />
    </Layout>
  );
};

export default Editor;
