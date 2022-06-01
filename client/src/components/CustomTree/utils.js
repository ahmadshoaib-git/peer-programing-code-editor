import { useRef, useEffect } from "react";

// @deprecated
export const findNodeById = (nodes, id) => {
  let final;

  function findNode(nodes, id) {
    nodes.forEach((n) => {
      if (n.id === id) {
        final = n;
        return;
      }
      if (n.children) findNode(n.children, id);
    });
  }

  findNode(nodes, id);

  return final;
};

export const searchDFS = ({ data, cond, childPathKey = "children" }) => {
  let final = null;
  let parentPath = [];
  let parent = null;
  let next = null;
  let prev = null;

  const recursiveFind = (tree) => {
    tree.forEach((item, index) => {
      if (cond(item, index)) {
        final = item;

        if (parentPath) {
          parentPath.forEach((p) => {
            // check if parent has the `current item`
            if (p && p[childPathKey].includes(item)) {
              parent = p;
              // set next & previous indexes
              next = p[childPathKey][index + 1];
              prev = p[childPathKey][index - 1];
            } else {
              parent = tree;
              // if parent is null then check the root of the tree
              next = tree[index + 1];
              prev = tree[index - 1];
            }
          });
        }
        return;
      }
      if (item[childPathKey]) {
        // push parent stack
        parentPath.push(item);
        recursiveFind(item[childPathKey]);
      }
    });
  };

  recursiveFind(data);
  return {
    parent,
    item: final,
    nextSibling: next,
    previousSibling: prev,
  };
};

export const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export const createFile = ({ name, nodeId }) => ({
  name,
  type: "file",
  id: nodeId,
});
export const createFolder = ({ name, nodeId }) => ({
  name,
  type: "folder",
  children: [],
  id: nodeId,
});
