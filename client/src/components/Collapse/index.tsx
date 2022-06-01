import React, { useState, useEffect, useLayoutEffect } from "react";
import Tree from "../CustomTree";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { VscSymbolFile } from "react-icons/vsc";
import { structure } from "./folderStructure.config";
import { reducer } from "src/components/Tree/state";
import { CustomCollapse, CustomPanel } from "./collapse.style";

export interface Props {
  projectData?: any;
  treeData?: any;
}

const Collapse: React.FC<Props> = ({ projectData, treeData }) => {
  // const Collapse = () => {
  /*********Folder Structure  ************/
  let [data, setData] = useState<any>(treeData);
  // const [state, dispatch] = React.useReducer(reducer, data);

  const handleClick = (node: any) => {
    console.log(node);
  };
  const handleUpdate = React.useCallback(
    (state: any) => {
      console.log("->> ", state);
      setData(state);
    },
    [data]
  );

  function callback(key: any) {
    console.log(key);
  }
  const genExtra = () => <></>;
  const text = "This is a dummy text";
  console.log("--- ", text);
  return (
    <CustomCollapse
      defaultActiveKey={["1"]}
      onChange={callback}
      expandIconPosition={"left"}
      expandIcon={({ isActive }) =>
        isActive ? <IoMdArrowDropdown /> : <IoMdArrowDropright />
      }
    >
      <CustomPanel header="Files" key="1" extra={genExtra()}>
        <div>
          <Tree
            // state={state}
            // dispatch={dispatch}
            children={undefined}
            data={data}
            onUpdate={handleUpdate}
            onNodeClick={handleClick}
          />
        </div>
      </CustomPanel>
      <CustomPanel header="Dependencies" key="2" extra={genExtra()}>
        <div>{text}</div>
      </CustomPanel>
      <CustomPanel header="External Resources" key="3" extra={genExtra()}>
        <div>{text}</div>
      </CustomPanel>
    </CustomCollapse>
  );
};

export default React.memo(Collapse);
