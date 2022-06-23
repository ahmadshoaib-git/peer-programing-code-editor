import { v4 } from "uuid";

const codeData = `

const ReactComp = () => {
  return (
    <div>Hello World from ReactComp!</div>
  )
}

  `;

const codeDataIndex = `

const IndexComp = () => {
  return (
    <div>Hello World from IndexComp!</div>
  )
}

  `;

const codeDataApp = `

const AppComp = () => {
  return (
    <div>Hello World from AppComp!</div>
  )
}

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
