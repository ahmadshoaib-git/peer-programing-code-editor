import React, { useState, useEffect } from "react";
import { Collapse, Tag, Timer, IconButton } from "src/components";
import { BiWorld } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";
import {
  CustomEditorSideBarWrapper,
  CustomEditorSideBarHeader,
  SpanWrapper,
} from "./EditorSideBar.style";

export interface Props {
  data?: any;
  fetchCodeByNodeId: (nodeId: any, name: String) => void;
  enableSaveBtn: boolean;
  setNewCodeNewFile: any;
  deleteProjectData?: (tree: any, fileId: any) => void;
  updateProjectCodeFileName: (tree: any, fileId: any, fileName: String) => void;
  setNewTree: (newTree: any) => void;
  saveFileDataFun: () => void;
  openFileName: String;
}
const EditorSideBar: React.FC<Props> = ({
  data,
  enableSaveBtn,
  fetchCodeByNodeId,
  setNewCodeNewFile,
  setNewTree,
  updateProjectCodeFileName,
  deleteProjectData,
  saveFileDataFun,
  openFileName,
}) => {
  const treeData = data ? JSON.parse(data?.projectDetail?.fileTree) : [];
  return (
    <CustomEditorSideBarWrapper>
      <CustomEditorSideBarHeader>
        <h2>
          <BiWorld />
          <span>Project X</span>
        </h2>
        <div className="flex">
          <Timer />
          {enableSaveBtn && (
            <SpanWrapper
              onClick={() => {
                console.log("SAVE !!!");
                saveFileDataFun();
              }}
            >
              <IconButton title={"Save File"}>
                <FiUpload />
              </IconButton>
            </SpanWrapper>
          )}
        </div>
      </CustomEditorSideBarHeader>
      <Collapse
        projectData={data}
        treeData={treeData}
        fetchCodeByNodeId={fetchCodeByNodeId}
        setNewTree={setNewTree}
        setNewCodeNewFile={setNewCodeNewFile}
        updateProjectCodeFileName={updateProjectCodeFileName}
        deleteProjectData={deleteProjectData}
        openFileName={openFileName}
      />
    </CustomEditorSideBarWrapper>
  );
};

export default React.memo(EditorSideBar);
