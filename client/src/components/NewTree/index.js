import React, { useState } from "react";
import { v4 } from "uuid";
import { structure } from "./structure";

import { StyledTree } from "./Tree.style";
import { Folder } from "./Folder/TreeFolder";
import { File } from "./File/TreeFile";
import { addFileRecursively, findNodeById } from "./utils";

const Tree = (props) => {
  const [folderStructure, setFolderStructure] = useState(structure);
  const onNodeClickHandler = (node) => {
    try {
      props.onNodeClick(node);
    } catch (err) {
      console.log(err);
    }
  };

  const onFileClickHandler = (node) => {
    try {
      const newData = findNodeById(folderStructure, node.id);
      node.id = "34hkj3h4jkgkjg3b";
      node.parentNode = newData;
      if (newData?.children) newData.children = [...newData.children, node];
      else newData.children = [node];
    } catch (err) {
      console.log(err);
    }
  };
  const addFile = (data, callback) => {
    const newData = findNodeById(folderStructure, data.id);
    data.id = "34hkj3h4jkgkjg3b";
    data.parentNode = newData;
    if (newData?.children) newData.children = [...newData.children, data];
    else newData.children = [data];
    callback();
  };
  return (
    <StyledTree>
      <TreeRecusive
        data={folderStructure}
        parentNode={folderStructure}
        onNodeClickHandler={onNodeClickHandler}
        addFile={addFile}
        onFileClickHandler={onFileClickHandler}
        addFolder={(data) => console.log(data)}
      />
    </StyledTree>
  );
};

const TreeRecusive = ({
  data,
  parentNode,
  onFileClickHandler,
  onNodeClickHandler,
  addFile,
  addFolder,
}) => {
  return data?.length > 0
    ? data.map((item) => {
        item.parentNode = parentNode;
        if (!parentNode) {
          item.parentNode = data;
        }
        if (!item.id) item.id = data.id;

        if (item.type === "file") {
          return (
            <File
              key={item.id}
              id={item.id}
              name={item.name}
              node={item}
              onNodeClick={(node) => onFileClickHandler(node)}
            />
          );
        }
        if (item.type === "folder") {
          return (
            <Folder
              key={item.id}
              id={item.id}
              name={item.name}
              node={item}
              onNodeClick={onNodeClickHandler}
              addFile={addFile}
              addFolder={addFolder}
            >
              <TreeRecusive parentNode={item} data={item.children} />
            </Folder>
          );
        }
      })
    : [];
};

Tree.File = File;
Tree.Folder = Folder;

export default React.memo(Tree);
