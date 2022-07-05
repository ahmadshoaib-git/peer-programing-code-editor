import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import Tree from "../CustomTree";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { VscSymbolFile } from "react-icons/vsc";
import { structure } from "./folderStructure.config";
import { reducer } from "src/components/Tree/state";
import { CustomCollapse, CustomPanel } from "./collapse.style";

export interface Props {
  fetchCodeByNodeId: (nodeId: any, name: string) => void;
  deleteProjectData?: (tree: any, fileId: any) => void;
  updateCodeDataForNewFile: (
    tree: any,
    fileId: any,
    status: any,
    name: any
  ) => void;
  updateProjectCodeFileName: (tree: any, fileId: any, fileName: String) => void;
}

const Collapse: React.FC<Props> = ({
  fetchCodeByNodeId,
  deleteProjectData,
  updateProjectCodeFileName,
  updateCodeDataForNewFile,
}) => {
  const { projectData, treeData, enableSave, fileOpenedName } = useSelector(
    (state: RootState) => {
      return state.projectEditor;
    }
  );
  let [data, setData] = useState<any>(treeData);
  const handleClick = (node: any) => {
    if (node.node.type === "folder") return;
    fetchCodeByNodeId(node.node.id, node.node.name);
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
  if (!projectData || !data) return <></>;
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
            children={undefined}
            data={data}
            onUpdate={handleUpdate}
            onNodeClick={handleClick}
            deleteProjectData={deleteProjectData}
            updateCodeDataForNewFile={updateCodeDataForNewFile}
            updateProjectCodeFileName={updateProjectCodeFileName}
            openFileName={fileOpenedName}
            enableSaveBtn={enableSave}
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
