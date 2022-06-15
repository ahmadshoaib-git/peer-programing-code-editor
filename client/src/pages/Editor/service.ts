import axios from "axios";
import { BASE_URL } from "src/utils";

const getProjectById = async (id: String) => {
  return await axios({
    method: "GET",
    url: `${BASE_URL}/project/individual?id=${id}`,
  });
};

const getProjectFileDataById = async (projectId: String, fileId: String) => {
  return await axios({
    method: "GET",
    url: `${BASE_URL}/project/getProjectFileData?projectId=${projectId}&fileId=${fileId}`,
  });
};
///saveProjectData
const saveProjectData = async (
  projectId: String,
  fileId: String,
  fileTree: any,
  fileCode: String
) => {
  const creds = {
    projectId: projectId,
    fileId: fileId,
    fileTree: fileTree,
    fileCode: fileCode,
  };
  return await axios({
    method: "POST",
    url: `${BASE_URL}/project/saveProjectData`,
    // url: `/user/login`,
    data: creds,
  });
};

const saveFileData = async (
  projectId: String,
  fileId: String,
  fileCode: String
) => {
  const creds = {
    projectId: projectId,
    fileId: fileId,
    fileCode: fileCode,
  };
  return await axios({
    method: "POST",
    url: `${BASE_URL}/project/saveFileData`,
    // url: `/user/login`,
    data: creds,
  });
};

const deleteProjectData = async (
  projectId: String,
  fileId: String,
  fileTree: any
) => {
  const creds = {
    projectId: projectId,
    fileId: fileId,
    fileTree: fileTree,
  };
  return await axios({
    method: "POST",
    url: `${BASE_URL}/project/deleteProjectData`,
    // url: `/user/login`,
    data: creds,
  });
}; //editFileFolderName

const editProjectFileFolderName = async (
  projectId: String,
  fileId: String,
  fileTree: any,
  fileName: String
) => {
  const creds = {
    projectId: projectId,
    fileId: fileId,
    fileTree: fileTree,
    fileName: fileName,
  };
  return await axios({
    method: "POST",
    url: `${BASE_URL}/project/editFileFolderName`,
    // url: `/user/login`,
    data: creds,
  });
};

export {
  getProjectById,
  getProjectFileDataById,
  editProjectFileFolderName,
  saveProjectData,
  deleteProjectData,
  saveFileData,
};
