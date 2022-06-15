import { v4 } from "uuid";

const codeData = `
  import React, {useState} from "react";

const ReactComp = () => {
  return (
    <div>Hello World from IndexComp!</div>
  )
}

export default ReactComp;
  `;

const codeDataIndex = `
  import React, {useState} from "react";

const IndexComp = () => {
  return (
    <div>Hello World from IndexComp!</div>
  )
}

export default IndexComp;
  `;

const codeDataApp = `
  import React, {useState} from "react";

const AppComp = () => {
  return (
    <div>Hello World from AppComp!</div>
  )
}

export default AppComp;
  `;

// const structure = [
//   {
//     type: "folder",
//     name: "src",
//     id: v4(),
//     children: [{ type: "file", name: "index.js", id: v4() }],
//   },
// ];

const createStructure = (uuid1: any, uuid2: any, uuid3: any) => {
  const structure = [
    {
      type: "folder",
      name: "src",
      id: uuid1,
      children: [
        { type: "file", name: "index.js", id: uuid2 },
        { type: "file", name: "app.js", id: uuid3 },
      ],
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

const getInitialCodeDataAppIndex = (uuid1: any, uuid2: any) => {
  return [
    {
      id: uuid1,
      code: codeDataIndex,
    },
    {
      id: uuid2,
      code: codeDataApp,
    },
  ];
};

export { getInitialCodeData, getInitialCodeDataAppIndex, createStructure };