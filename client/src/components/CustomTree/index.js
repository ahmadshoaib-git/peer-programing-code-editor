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

  useEffect(() => {
    const tree = getTree(state, state);
    console.log(tree);
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

  const onNodeClickHandler = React.useCallback((node) => {
    try {
      props.onNodeClick(node);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getTree = (data) => {
    return data?.length > 0
      ? data.map((item) => {
          // item.parentNode = parentNode;
          // if (!parentNode) {
          //   item.parentNode = data;
          // }
          // if (!item.id) item.id = v4();
          console.log("item >", item);
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

  const isImparative = props.data && !props.children;
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
        <StyledTree>
          {isImparative ? (
            <TreeRecusive data={state} parentNode={state} />
          ) : (
            props?.children
          )}
        </StyledTree>
      </TreeContext.Provider>
    </ThemeProvider>
  );
};

const TreeRecusive = ({ data, parentNode }) => {
  return data?.length > 0
    ? data.map((item) => {
        item.parentNode = parentNode;
        if (!parentNode) {
          item.parentNode = data;
        }
        // if (!item.id) item.id = v4();

        if (item.type === "file") {
          return (
            <File key={item.id} id={item.id} name={item.name} node={item} />
          );
        }
        if (item.type === "folder") {
          return (
            <Folder key={item.id} id={item.id} name={item.name} node={item}>
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
