import { v4 } from "uuid";
const codeData = `
  import React, {useState} from "react";

const CompName = () => {
  return (
    <div>Hello World!</div>
  )
}

export default CompName;
  `;

// const structure = [
//   {
//     type: "folder",
//     name: "src",
//     id: v4(),
//     children: [{ type: "file", name: "index.js", id: v4() }],
//   },
// ];

const createStructure = (uuid1: any, uuid2: any) => {
  const structure = [
    {
      type: "folder",
      name: "src",
      id: uuid1,
      children: [{ type: "file", name: "index.js", id: uuid2 }],
    },
  ];
  return structure;
};

const getInitialCodeData = (uuid: any) => {
  return [
    {
      id: uuid,
      code: codeData,
    },
  ];
};

export { getInitialCodeData, createStructure };
