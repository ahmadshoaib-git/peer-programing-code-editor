import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Collapse, Tag, Timer, IconButton } from "src/components";
import { BiWorld } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";
import { RootState } from "src/redux/store";
import {
  CustomEditorSideBarWrapper,
  CustomEditorSideBarHeader,
  SpanWrapper,
} from "./EditorSideBar.style";

export interface Props {
  data?: any;
  fetchCodeByNodeId: (nodeId: any, name: String) => void;
  enableSaveBtn: boolean;
  deleteProjectData?: (tree: any, fileId: any) => void;
  updateProjectCodeFileName: (tree: any, fileId: any, fileName: String) => void;
  updateCodeDataForNewFile: (tree: any, fileId: any, status: any) => void;
  openFileName: String;
}
const EditorSideBar: React.FC<Props> = ({
  data,
  enableSaveBtn,
  fetchCodeByNodeId,
  updateProjectCodeFileName,
  updateCodeDataForNewFile,
  deleteProjectData,
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
        <Timer />
      </CustomEditorSideBarHeader>
      <Collapse
        projectData={data}
        treeData={treeData}
        fetchCodeByNodeId={fetchCodeByNodeId}
        updateProjectCodeFileName={updateProjectCodeFileName}
        deleteProjectData={deleteProjectData}
        openFileName={openFileName}
        enableSaveBtn={enableSaveBtn}
        updateCodeDataForNewFile={updateCodeDataForNewFile}
      />
    </CustomEditorSideBarWrapper>
  );
};

export default React.memo(EditorSideBar);
