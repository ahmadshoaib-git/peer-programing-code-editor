import React, { useState, useEffect } from "react";
import { Collapse, Tag } from "src/components";
import { BiWorld } from "react-icons/bi";
import {
  CustomEditorSideBarWrapper,
  CustomEditorSideBarHeader,
} from "./EditorSideBar.style";
const EditorSideBar = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);
  return (
    <CustomEditorSideBarWrapper>
      <CustomEditorSideBarHeader>
        <h2>
          <BiWorld />
          <span>Project X</span>
        </h2>
        <Tag color="red">{time.toLocaleTimeString("en-US")}</Tag>
      </CustomEditorSideBarHeader>
      <Collapse />
    </CustomEditorSideBarWrapper>
  );
};

export default EditorSideBar;
