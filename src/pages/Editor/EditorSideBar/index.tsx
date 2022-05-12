import React from "react";
import { Collapse } from "src/components";
import { BiWorld } from "react-icons/bi";
import {
  CustomEditorSideBarWrapper,
  CustomEditorSideBarHeader,
} from "./EditorSideBar.style";
const EditorSideBar = () => {
  return (
    <CustomEditorSideBarWrapper>
      <CustomEditorSideBarHeader>
        <BiWorld />
        <h2>Project X</h2>
      </CustomEditorSideBarHeader>
      <Collapse />
    </CustomEditorSideBarWrapper>
  );
};

export default EditorSideBar;
