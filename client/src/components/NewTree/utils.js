const addFileRecursively = (insertionData, data) => {
  if (data?.length > 0) {
    data.forEach((obj) => {
      addFileRecursively(insertionData, obj);
    });
  }
  if (data?.children?.length > 0) {
    data?.children?.forEach((obj) => {
      addFileRecursively(insertionData, obj);
    });
  }
  if (data.id === insertionData.id) {
    if (data?.children?.length > 0) {
      data.children.push({
        type: insertionData.type,
        name: insertionData.name,
        id: insertionData.newId,
      });
    } else {
      data.children = [
        {
          type: insertionData.type,
          name: insertionData.name,
          id: insertionData.newId,
        },
      ];
    }
  }
  return data;
  //   data?.map();
};
const findNodeById = (nodes, id) => {
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

export { findNodeById, addFileRecursively };
