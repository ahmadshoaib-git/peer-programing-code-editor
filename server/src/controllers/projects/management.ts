export const createFile = ({ name }: any) => ({ name, type: "file" });
export const createFolder = ({ name }: any) => ({
  name,
  type: "folder",
  files: [],
});
