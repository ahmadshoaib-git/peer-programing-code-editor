import React from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { useParams, Navigate } from "react-router-dom";
import { Layout } from "src/common";
import EditorSideBar from "./EditorSideBar";
import { CodeEditor, PageLoader, Notify } from "src/components";
import { setProjectInitialState } from "src/pages/Editor/slice";
import {
  getProjectById,
  getProjectFileDataById,
  editProjectFileFolderName,
  saveProjectData,
  deleteProjectData,
  saveFileData,
} from "./service";
import { EditorFileName } from "./editor.style";

export interface Props {
  projectData?: any;
  codeData: any;
  fetchCodeByNodeId: (nodeId: any, name: String) => void;
  deleteProjectDataFun: (tree: any, fileId: any) => void;
  updateCodeDataForNewFile: (tree: any, fileId: any, status: any) => void;
  updateProjectCodeFileName: (tree: any, fileId: any, fileName: String) => void;
  saveFileDataFun: () => void;
  setNewCodeData?: any;
  setNewTreeData?: any;
  enableSaveBtn: boolean;
  setNewCodeNewFile?: any;
  openFileName: String;
}

const Editor = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [projectData, setProjectData] = React.useState<any>(undefined);
  const [codeData, setCodeData] = React.useState<any>(undefined);
  const [newCodeData, setNewCodeData] = React.useState<any>(undefined);
  const [newTreeData, setNewTreeData] = React.useState<any>(undefined);
  const [enableSave, setEnableSave] = React.useState<boolean>(false);
  const [openFileName, setOpenFileName] = React.useState<String>("index.js");
  const [newCodeNewFile, setNewCodeNewFile] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!param.id) <Navigate to="/" />;
    fetchData(param.id);
  }, []);

  React.useEffect(() => {
    try {
      if (codeData[0]?.code !== newCodeData[0]?.code) {
        setEnableSave(true);
      } else {
        setEnableSave(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [codeData, newCodeData]);

  const fetchData = async (id: any) => {
    try {
      setLoading(true);
      const data = await getProjectById(id);
      setLoading(false);
      setProjectData(data?.data);
      const newFiles = JSON.parse(data?.data?.projectDetail?.filesCode);
      const tempData = [
        {
          id: newFiles[0]?.id,
          code: newFiles[0]?.code,
        },
      ];
      setCodeData(tempData);
      setNewCodeData(tempData);
      const treeData = data?.data
        ? JSON.parse(data?.data?.projectDetail?.fileTree)
        : [];

      setNewTreeData(treeData);
      Notify(`Welcome to ${data?.data?.projectDetail?.name}`, "success");
      dispatch(
        setProjectInitialState({
          codeData: newFiles[0]?.code,
          fetchCodeByNodeId: fetchCodeByNodeId,
          projectData: data?.data,
          treeData: treeData,
        })
      );
      return data.data;
    } catch (err) {
      console.log(">> ", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProjectDataFun = (tree: any, fileId: String) => {
    try {
      const res = deleteProjectData(projectData._id, fileId, tree);
      Notify(`Document deleted successfully`, "success");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const saveFileDataFun = async () => {
    try {
      const res = await saveFileData(
        projectData._id,
        newCodeData[0]?.id,
        newCodeData[0]?.code
      );
      setEnableSave(false);
      Notify(`File saved successfully`, "success");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCodeByNodeId = async (nodeId: any, name: String) => {
    console.log("name >", name);
    const result = await getProjectFileDataById(projectData._id, nodeId);
    const newResult: any = JSON.parse(result.data);
    setCodeData([
      {
        id: newResult?.id,
        code: newResult?.code,
      },
    ]);
    setNewCodeData([
      {
        id: newResult?.id,
        code: newResult?.code,
      },
    ]);
    setOpenFileName(name);
  };

  const updateProjectCodeFileName = async (
    tree: any,
    fileId: any,
    fileName: String
  ) => {
    try {
      const res = await editProjectFileFolderName(
        projectData._id,
        fileId,
        tree,
        fileName
      );
      Notify(`Document name successfully updated to ${fileName}`, "success");
      console.log("res >", res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateCodeDataForNewFile = async (
    tree: any,
    fileId: any,
    status: any
  ) => {
    try {
      const codeData = `
      import React, {useState} from "react";
  
      const NewComp = () => {
        return (
          <div>Hello World from NewComp!</div>
        )
      }
      
      export default NewComp;
      `;
      const tempCode = [
        {
          id: fileId,
          code: codeData,
        },
      ];
      setCodeData(tempCode);
      setNewCodeData(tempCode);
      const res = await saveProjectData(
        projectData._id,
        fileId,
        tree,
        codeData
      );
      Notify(`New file created successfully`, "success");
      console.log("res >", res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <LayoutEditor
          projectData={projectData}
          fetchCodeByNodeId={fetchCodeByNodeId}
          codeData={codeData}
          setNewCodeData={setNewCodeData}
          setNewTreeData={setNewTreeData}
          setNewCodeNewFile={setNewCodeNewFile}
          updateCodeDataForNewFile={updateCodeDataForNewFile}
          updateProjectCodeFileName={updateProjectCodeFileName}
          deleteProjectDataFun={deleteProjectDataFun}
          saveFileDataFun={saveFileDataFun}
          enableSaveBtn={enableSave}
          openFileName={openFileName}
        />
      )}
    </>
  );
};

const LayoutEditor: React.FC<Props> = ({
  projectData,
  codeData,
  fetchCodeByNodeId,
  setNewCodeData,
  enableSaveBtn,
  setNewTreeData,
  setNewCodeNewFile,
  updateCodeDataForNewFile,
  updateProjectCodeFileName,
  deleteProjectDataFun,
  saveFileDataFun,
  openFileName,
}) => {
  return (
    <Layout
      sideBarContent={
        <EditorSideBar
          data={projectData}
          fetchCodeByNodeId={fetchCodeByNodeId}
          enableSaveBtn={enableSaveBtn}
          setNewTree={(newTree: any) => setNewTreeData(newTree)}
          setNewCodeNewFile={(tree: any, fileId: any, status: boolean) =>
            updateCodeDataForNewFile(tree, fileId, status)
          }
          updateProjectCodeFileName={updateProjectCodeFileName}
          deleteProjectData={deleteProjectDataFun}
          saveFileDataFun={saveFileDataFun}
          openFileName={openFileName}
        />
      }
    >
      <EditorFileName>{openFileName || ""}</EditorFileName>
      <CodeEditor
        data={codeData}
        setNewCode={(tempCode: any) => setNewCodeData(tempCode)}
      />
    </Layout>
  );
};

export default React.memo(Editor);
