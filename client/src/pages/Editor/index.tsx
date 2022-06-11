import React from "react";
import io from "socket.io-client";
import { Tooltip } from "antd";
import { BsFileEarmarkLock } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { useQuery } from "react-query";
import { useParams, Navigate } from "react-router-dom";
import { CgOptions } from "react-icons/cg";
import { FiUpload } from "react-icons/fi";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import {
  setShowEditorSideBar,
  setLockedFilesPayload,
} from "src/redux/slices/general";
import { setCodeChanged } from "./slice";
import { Layout } from "src/common";
import EditorSideBar from "./EditorSideBar";
import { MenuItemsProp } from "src/components/Dropdown";
import {
  CodeEditor,
  PageLoader,
  Notify,
  IconButton,
  Dropdown,
  CustomTooltip,
} from "src/components";
import {
  ProjectDetailsModal,
  ContributorDetailModal,
  EditContributor,
} from "src/common";
import { setProjectInitialState } from "src/pages/Editor/slice";
import {
  getProjectById,
  getProjectFileDataById,
  editProjectFileFolderName,
  saveProjectData,
  deleteProjectData,
  saveFileData,
} from "./service";
import {
  EditorHeaderSection,
  SpanWrapper,
  SpanWrapperSave,
  FileLocked,
} from "./editor.style";

export interface Props {
  projectData?: any;
  codeData: any;
  fetchCodeByNodeId: (nodeId: any, name: String) => void;
  deleteProjectDataFun: (tree: any, fileId: any) => void;
  updateCodeDataForNewFile: (tree: any, fileId: any, status: any) => void;
  updateProjectCodeFileName: (tree: any, fileId: any, fileName: String) => void;
  saveFileDataFun: () => void;
  setNewCodeData?: any;
  enableSaveBtn: boolean;
  setNewCodeNewFile?: any;
  openFileName: String;

  openProjectDetailModal: any;
  setOpenProjectDetailModal: any;
  openContributorModal: any;
  setOpenContributorModal: any;
  openEditContributorModal: any;
  setOpenEditContributorModal: any;
}

const Editor = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [socket, setSocket] = React.useState<any>(io(`http://localhost:8082`));
  const [projectData, setProjectData] = React.useState<any>(undefined);
  const [codeData, setCodeData] = React.useState<any>(undefined);
  const [newCodeData, setNewCodeData] = React.useState<any>(undefined);
  const [enableSave, setEnableSave] = React.useState<boolean>(false);
  const [openFileName, setOpenFileName] = React.useState<String>("index.js");
  const [newCodeNewFile, setNewCodeNewFile] = React.useState<boolean>(false);

  const [openProjectDetailModal, setOpenProjectDetailModal] =
    React.useState<boolean>(false);
  const [openContributorModal, setOpenContributorModal] =
    React.useState<boolean>(false);
  const [openEditContributorModal, setOpenEditContributorModal] =
    React.useState<boolean>(false);
  React.useEffect(() => {
    if (!param.id) <Navigate to="/" />;
    fetchData(param.id);
  }, []);

  React.useEffect(() => {
    const newSocket: any = io(`http://localhost:8082`);
    setSocket(newSocket);
    newSocket.on("connect", () => {});
    newSocket.on("connection", () => {});
    // newSocket.emit("file_locked", { id: "342342", name: "index.js" });
    newSocket.on("file_locked", function (msg: any) {
      console.log("file_locked >", msg);
      dispatch(setLockedFilesPayload({ lockedFiles: msg }));
    });
    return () => newSocket.close();
  }, [setSocket]);

  React.useEffect(() => {
    try {
      const editorEmail = localStorage.getItem("email");
      const editorName = localStorage.getItem("name");
      if (codeData[0]?.code !== newCodeData[0]?.code) {
        setEnableSave(true);
        dispatch(setCodeChanged({ codeChanged: true }));
        socket.emit("file_locked", {
          name: openFileName,
          fileId: newCodeData[0].id,
          editorEmail: editorEmail,
          editorName: editorName,
          type: "lock",
        });
      } else {
        dispatch(setCodeChanged({ codeChanged: false }));
        socket.emit("file_locked", {
          name: openFileName,
          fileId: newCodeData[0].id,
          editorEmail: editorEmail,
          editorName: editorName,
          type: "unlock",
        });
        setEnableSave(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [codeData, newCodeData]);

  const fetchData = async (id: any) => {
    try {
      setLoading(true);
      const data = await getProjectById(id);
      setLoading(false);
      setProjectData(data?.data);
      const newFiles = JSON.parse(data?.data?.projectDetail?.filesCode);
      const tempData = [
        {
          id: newFiles[0]?.id,
          code: newFiles[0]?.code,
        },
      ];
      setCodeData(tempData);
      setNewCodeData(tempData);
      const treeData = data?.data
        ? JSON.parse(data?.data?.projectDetail?.fileTree)
        : [];

      Notify(`Welcome to ${data?.data?.projectDetail?.name}`, "success");
      dispatch(
        setProjectInitialState({
          codeData: newFiles[0]?.code,
          fetchCodeByNodeId: fetchCodeByNodeId,
          projectData: data?.data,
          treeData: treeData,
        })
      );
      const email = localStorage.getItem("email");
      const editorName = localStorage.getItem("name");
      // socket.emit("file_locked", {
      //   fileId: tempData[0].id,
      //   name: "index.js",
      //   editorEmail: email,
      //   editorName: editorName,
      // });
      return data.data;
    } catch (err) {
      console.log(">> ", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProjectDataFun = (tree: any, fileId: String) => {
    try {
      const res = deleteProjectData(projectData._id, fileId, tree);
      Notify(`Document deleted successfully`, "success");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const saveFileDataFun = async () => {
    try {
      const res = await saveFileData(
        projectData._id,
        newCodeData[0]?.id,
        newCodeData[0]?.code
      );
      setEnableSave(false);
      Notify(`File saved successfully`, "success");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCodeByNodeId = async (nodeId: any, name: String) => {
    try {
      console.log("name >", name);
      const fileId = codeData[0]?.id;
      const result = await getProjectFileDataById(projectData._id, nodeId);
      // socket.emit("file_unlocked", {
      //   id: projectData._id,
      //   fileId: fileId,
      //   name: openFileName,
      // });
      const unlockFileData = {
        fileId: fileId,
        name: openFileName,
      };
      const newResult: any = JSON.parse(result.data);
      setCodeData([
        {
          id: newResult?.id,
          code: newResult?.code,
        },
      ]);
      setNewCodeData([
        {
          id: newResult?.id,
          code: newResult?.code,
        },
      ]);
      setOpenFileName(name);
      const email = localStorage.getItem("email");
      const editorName = localStorage.getItem("name");
      console.log({
        id: projectData._id,
        name: name,
        fileId: nodeId,
        editorEmail: email,
      });
      // socket.emit("file_locked", {
      //   name: name,
      //   fileId: nodeId,
      //   editorEmail: email,
      //   editorName: editorName,
      // });
    } catch (err: any) {
      console.log(err);
    }
  };

  const updateProjectCodeFileName = async (
    tree: any,
    fileId: any,
    fileName: String
  ) => {
    try {
      const res = await editProjectFileFolderName(
        projectData._id,
        fileId,
        tree,
        fileName
      );
      Notify(`Document name successfully updated to ${fileName}`, "success");
      console.log("res >", res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateCodeDataForNewFile = async (
    tree: any,
    fileId: any,
    status: any
  ) => {
    try {
      const codeData = `
      import React, {useState} from "react";
  
      const NewComp = () => {
        return (
          <div>Hello World from NewComp!</div>
        )
      }
      
      export default NewComp;
      `;
      const tempCode = [
        {
          id: fileId,
          code: codeData,
        },
      ];
      setCodeData(tempCode);
      setNewCodeData(tempCode);
      const res = await saveProjectData(
        projectData._id,
        fileId,
        tree,
        codeData
      );
      Notify(`New file created successfully`, "success");
      console.log("res >", res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <LayoutEditor
          projectData={projectData}
          fetchCodeByNodeId={fetchCodeByNodeId}
          codeData={codeData}
          setNewCodeData={setNewCodeData}
          setNewCodeNewFile={setNewCodeNewFile}
          updateCodeDataForNewFile={updateCodeDataForNewFile}
          updateProjectCodeFileName={updateProjectCodeFileName}
          deleteProjectDataFun={deleteProjectDataFun}
          saveFileDataFun={saveFileDataFun}
          enableSaveBtn={enableSave}
          openFileName={openFileName}
          openProjectDetailModal={openProjectDetailModal}
          setOpenProjectDetailModal={setOpenProjectDetailModal}
          openContributorModal={openContributorModal}
          setOpenContributorModal={setOpenContributorModal}
          openEditContributorModal={openEditContributorModal}
          setOpenEditContributorModal={setOpenEditContributorModal}
        />
      )}
    </>
  );
};

const LayoutEditor: React.FC<Props> = ({
  projectData,
  codeData,
  fetchCodeByNodeId,
  setNewCodeData,
  enableSaveBtn,
  setNewCodeNewFile,
  updateCodeDataForNewFile,
  updateProjectCodeFileName,
  deleteProjectDataFun,
  saveFileDataFun,
  openFileName,

  openProjectDetailModal,
  setOpenProjectDetailModal,
  openContributorModal,
  setOpenContributorModal,
  openEditContributorModal,
  setOpenEditContributorModal,
}) => {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const projectMenu: Array<MenuItemsProp> = [
    {
      label: "Open Details",
      onClick: () => {
        console.log("Open!!");
        setOpenProjectDetailModal(true);
      },
    },
    {
      label: "Open Contributors",
      onClick: () => {
        console.log("Open!!");
        setOpenContributorModal(true);
      },
    },
  ];

  if (email === projectData?.ownerEmail) {
    projectMenu.push({
      label: "Edit Contributors",
      onClick: () => {
        console.log("Open!!");
        setOpenEditContributorModal(true);
      },
    });
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    // event.preventDefault();
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if ((event.ctrlKey || event.metaKey) && charCode === "s") {
      event.preventDefault();
      console.log("SAVE !!!");
      saveFileDataFun();
    }
    // else if((event.ctrlKey || event.metaKey) && charCode === 'c') {
    //   alert("CTRL+C Pressed");
    // }else if((event.ctrlKey || event.metaKey) && charCode === 'v') {
    //   alert("CTRL+V Pressed");
    // }
  };

  const { showEditorSideBar, lockedFiles } = useSelector((state: RootState) => {
    return state.general;
  });

  const toggleSideBar = () => {
    dispatch(setShowEditorSideBar({ showEditorSideBar: !showEditorSideBar }));
  };

  const lockFile = lockedFiles.find(
    (lFile) => lFile.fileId === codeData[0]?.id
  );

  return (
    <span onKeyDown={handleKeyDown}>
      <Layout
        sideBarContent={
          <EditorSideBar
            data={projectData}
            fetchCodeByNodeId={fetchCodeByNodeId}
            enableSaveBtn={enableSaveBtn}
            setNewCodeNewFile={(tree: any, fileId: any, status: boolean) =>
              updateCodeDataForNewFile(tree, fileId, status)
            }
            updateProjectCodeFileName={updateProjectCodeFileName}
            deleteProjectData={deleteProjectDataFun}
            saveFileDataFun={saveFileDataFun}
            openFileName={openFileName}
          />
        }
      >
        <EditorHeaderSection>
          {showEditorSideBar ? (
            <IoIosArrowDropleftCircle onClick={() => toggleSideBar()} />
          ) : (
            <IoIosArrowDroprightCircle onClick={() => toggleSideBar()} />
          )}
          <div className="file-name-section">
            {lockFile && (
              <Tooltip
                title={`Locked by ${lockFile.editorName}`}
                placement="bottomRight"
              >
                <FileLocked>
                  <BsFileEarmarkLock />
                </FileLocked>{" "}
              </Tooltip>
            )}
            {openFileName || ""}
          </div>
        </EditorHeaderSection>

        <Dropdown
          placement="bottomRight"
          menuItems={projectMenu}
          trigger={["click"]}
        >
          <SpanWrapper>
            <IconButton title={"Options"}>
              <CgOptions />
            </IconButton>
          </SpanWrapper>
        </Dropdown>

        {enableSaveBtn && (
          <SpanWrapperSave
            onClick={() => {
              console.log("SAVE !!!");
              saveFileDataFun();
            }}
          >
            <IconButton title={"Save File (CTRL + S)"}>
              <FiUpload />
            </IconButton>
          </SpanWrapperSave>
        )}

        <CodeEditor
          data={codeData}
          setNewCode={(tempCode: any) => setNewCodeData(tempCode)}
        />
      </Layout>

      <ProjectDetailsModal
        title=""
        isModalVisible={openProjectDetailModal}
        closeModal={() => setOpenProjectDetailModal(false)}
        data={projectData}
      />
      <ContributorDetailModal
        title=""
        isModalVisible={openContributorModal}
        closeModal={() => setOpenContributorModal(false)}
        contributors={projectData?.contributor}
      />
      <EditContributor
        title=""
        isModalVisible={openEditContributorModal}
        closeModal={() => setOpenEditContributorModal(false)}
        contributors={projectData?.contributor?.map((obj: any) => {
          return {
            name: obj.name,
            email: obj.email,
          };
        })}
        saveContributors={(data: any) => console.log("---->>>", data)}
      />
    </span>
  );
};

export default React.memo(Editor);
