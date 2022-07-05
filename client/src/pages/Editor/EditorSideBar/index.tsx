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
  fetchCodeByNodeId: (nodeId: any, name: string) => void;
  deleteProjectData?: (tree: any, fileId: any) => void;
  updateProjectCodeFileName: (tree: any, fileId: any, fileName: String) => void;
  updateCodeDataForNewFile: (
    tree: any,
    fileId: any,
    status: any,
    name: any
  ) => void;
}
const EditorSideBar: React.FC<Props> = ({
  fetchCodeByNodeId,
  updateProjectCodeFileName,
  updateCodeDataForNewFile,
  deleteProjectData,
}) => {
  const { projectData } = useSelector((state: RootState) => {
    return state.projectEditor;
  });
  const projectName = projectData?.projectDetail?.name || "";
  return (
    <CustomEditorSideBarWrapper>
      <CustomEditorSideBarHeader>
        <h2>
          <BiWorld />
          <span>{projectName}</span>
        </h2>
        <Timer />
      </CustomEditorSideBarHeader>
      <Collapse
        fetchCodeByNodeId={fetchCodeByNodeId}
        updateProjectCodeFileName={updateProjectCodeFileName}
        deleteProjectData={deleteProjectData}
        updateCodeDataForNewFile={updateCodeDataForNewFile}
      />
    </CustomEditorSideBarWrapper>
  );
};

export default React.memo(EditorSideBar);
