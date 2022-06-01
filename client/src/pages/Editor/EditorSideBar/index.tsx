import React, { useState, useEffect } from "react";
import { Collapse, Tag, Timer } from "src/components";
import { BiWorld } from "react-icons/bi";
import {
  CustomEditorSideBarWrapper,
  CustomEditorSideBarHeader,
} from "./EditorSideBar.style";

export interface Props {
  data?: any;
}
const EditorSideBar: React.FC<Props> = ({ data }) => {
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
      <Collapse projectData={data} treeData={treeData} />
    </CustomEditorSideBarWrapper>
  );
};

export default React.memo(EditorSideBar);
