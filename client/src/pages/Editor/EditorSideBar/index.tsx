import React, { useState, useEffect } from "react";
import { Collapse, Tag, Timer } from "src/components";
import { BiWorld } from "react-icons/bi";
import {
  CustomEditorSideBarWrapper,
  CustomEditorSideBarHeader,
} from "./EditorSideBar.style";

export interface Props {
  data?: any;
  fetchCodeByNodeId: (nodeId: any) => void;
}
const EditorSideBar: React.FC<Props> = ({ data, fetchCodeByNodeId }) => {
  const treeData = JSON.parse(data?.projectDetail?.fileTree);
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
      />
    </CustomEditorSideBarWrapper>
  );
};

export default React.memo(EditorSideBar);
