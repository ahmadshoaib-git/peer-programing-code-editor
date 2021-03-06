import React, { useEffect, useReducer, useLayoutEffect } from "react";
import { v4 } from "uuid";
import { ThemeProvider } from "styled-components";

import { useDidMountEffect } from "./utils";
import { TreeContext, reducer } from "./state";

import { StyledTree } from "src/components/CustomTree/Tree.style";
import { Folder } from "src/components/CustomTree/Folder/TreeFolder";
import { File } from "src/components/CustomTree/File/TreeFile";

const Tree = (props) => {
  const [state, dispatch] = useReducer(reducer, props?.data);
  const [newFileId, setNewFileId] = React.useState(null);
  const [newFileType, setNewFileType] = React.useState("folder");
  const [updatedFileName, setUpdatedFileName] = React.useState("");
  const [newActionType, setNewActionType] = React.useState(null);
  const [fileName, setFileName] = React.useState("");

  useEffect(() => {
    const {
      setNewTree,
      deleteProjectData,
      updateProjectCodeFileName,
      updateCodeDataForNewFile,
    } = props;
    const tree = getTree(state, state);
    // setNewTree(tree);
    if (newActionType === "creation") {
      if (newFileType !== "folder")
        updateCodeDataForNewFile(tree, newFileId, true, fileName);
    }
    if (newActionType === "deletion") {
      deleteProjectData(tree, newFileId);
    }
    if (newActionType === "edit") {
      updateProjectCodeFileName(tree, newFileId, updatedFileName);
    }
  }, [state]);

  useLayoutEffect(() => {
    dispatch({ type: "SET_DATA", payload: props?.data });
  }, [props?.data]);

  useDidMountEffect(() => {
    try {
      props.onUpdate(state);
    } catch (err) {
      console.log(err);
    }
  }, [state]);

  const setNewFiledIdAndType = (id, type, action, name) => {
    setNewFileId(id);
    setNewFileType(type);
    setNewActionType(action);
    setFileName(name);
  }; //updateProjectCodeFileName

  const onNodeClickHandler = React.useCallback((node, name) => {
    try {
      props.onNodeClick(node);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getTree = (data) => {
    if (!data) return null;
    return data?.length > 0
      ? data.map((item) => {
          if (item.type === "file") {
            return {
              name: item.name,
              type: item.type,
              id: item.id,
            };
          } else if (item.type === "folder" && item?.children?.length > 0) {
            return {
              name: item.name,
              type: item.type,
              children: getTree(item.children),
              id: item.id,
            };
          } else if (item.type === "folder") {
            return {
              name: item.name,
              type: item.type,
              id: item.id,
            };
          }
        })
      : [];
  };

  console.log(props.data);
  const isImparative = props.data && !props.children;
  if (!props.data) return <></>;
  return (
    <ThemeProvider theme={{ indent: 20 }}>
      <TreeContext.Provider
        value={{
          isImparative,
          state,
          dispatch,
          onNodeClick: (node) => {
            onNodeClickHandler(node);
          },
        }}
      >
        {state ? (
          <StyledTree>
            {isImparative ? (
              <TreeRecusive
                data={state}
                parentNode={state}
                setNewCodeNewFile={props.setNewCodeNewFile}
                setUpdatedFileName={setUpdatedFileName}
                setNewFiledIdAndType={setNewFiledIdAndType}
                openFileName={props.openFileName}
              />
            ) : (
              props?.children
            )}
          </StyledTree>
        ) : (
          <></>
        )}
      </TreeContext.Provider>
    </ThemeProvider>
  );
};

const TreeRecusive = ({
  data,
  parentNode,
  setNewFiledIdAndType,
  setUpdatedFileName,
  openFileName,
}) => {
  return data?.length > 0
    ? data.map((item) => {
        const tempItem = JSON.parse(JSON.stringify(item));
        tempItem.parentNode = parentNode;
        if (!parentNode) {
          tempItem.parentNode = data;
        }
        // if (!tempItem.id) tempItem.id = v4();

        if (tempItem.type === "file") {
          return (
            <File
              key={tempItem.id}
              id={tempItem.id}
              name={tempItem.name}
              node={tempItem}
              setNewFiledIdAndType={setNewFiledIdAndType}
              setUpdatedFileName={setUpdatedFileName}
              openFileName={openFileName}
            />
          );
        }
        if (tempItem.type === "folder") {
          return (
            <Folder
              key={tempItem.id}
              id={tempItem.id}
              name={tempItem.name}
              node={tempItem}
              setNewFiledIdAndType={setNewFiledIdAndType}
              setUpdatedFileName={setUpdatedFileName}
              openFileName={openFileName}
            >
              <TreeRecusive
                parentNode={tempItem}
                data={tempItem.children}
                setNewFiledIdAndType={setNewFiledIdAndType}
                setUpdatedFileName={setUpdatedFileName}
                openFileName={openFileName}
              />
            </Folder>
          );
        }
      })
    : [];
};

Tree.File = File;
Tree.Folder = Folder;

export default React.memo(Tree);
