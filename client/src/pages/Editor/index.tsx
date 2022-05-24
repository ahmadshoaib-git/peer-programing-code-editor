import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { Layout } from "src/common";
import EditorSideBar from "./EditorSideBar";
import { CodeEditor } from "src/components";

const Editor = () => {
  const param = useParams();
  React.useEffect(() => {
    console.log("param >", param);
    if (!param.id) <Navigate to="/" />;
  }, []);
  return (
    <Layout sideBarContent={<EditorSideBar />}>
      <CodeEditor />
    </Layout>
  );
};

export default Editor;
