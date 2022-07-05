import React, { useEffect } from "react";
import { Tooltip } from "antd";
import { BsFileEarmarkLock } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import CustomSocket from "src/sockets";
import { useQuery } from "react-query";
import { useParams, Navigate } from "react-router-dom";
import { CgOptions } from "react-icons/cg";
import { FiUpload } from "react-icons/fi";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { MdPlayCircleOutline } from "react-icons/md";
import { VscCode } from "react-icons/vsc";
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
  OutputConsole,
} from "src/components";
import {
  ProjectDetailsModal,
  ContributorDetailModal,
  EditContributor,
} from "src/common";
import {
  setProjectInitialState,
  setOpenContributorModal,
  setOpenEditContributorModal,
  setOpenProjectDetailModal,
} from "src/pages/Editor/slice";
import { setShowOutputSection } from "src/redux/slices/general";
import {
  getProjectById,
  getProjectAllFilesData,
  getProjectFileDataById,
  editProjectFileFolderName,
  saveProjectData,
  deleteProjectData,
  saveFileData,
} from "./service";
import {
  EditorHeaderSection,
  EditorFooterSection,
  SpanWrapper,
  SpanWrapperSave,
  FileLocked,
} from "./editor.style";

export interface Props {
  projectData?: any;
  codeData: any;
  fetchCodeByNodeId: (nodeId: any, name: String) => void;
  deleteProjectDataFun: (tree: any, fileId: any) => void;
  updateCodeDataForNewFile: (
    tree: any,
    fileId: any,
    status: any,
    name: any
  ) => void;
  updateProjectCodeFileName: (tree: any, fileId: any, fileName: String) => void;
  saveFileDataFun: () => void;
  setNewCodeData?: any;
  enableSaveBtn: boolean;
  setNewCodeNewFile?: any;
  openFileName: String;
}

const Editor = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [projectData, setProjectData] = React.useState<any>(undefined);
  const [codeData, setCodeData] = React.useState<any>(undefined);
  const [newCodeData, setNewCodeData] = React.useState<any>(undefined);
  const [enableSave, setEnableSave] = React.useState<boolean>(false);
  const [openFileName, setOpenFileName] = React.useState<String>("index.js");

  React.useEffect(() => {
    if (!param.id) <Navigate to="/" />;
    fetchData(param.id);
  }, []);

  React.useEffect(() => {
    try {
      const Socket = new CustomSocket();
      Socket.getSocket();
      if (projectData?._id) {
        Socket.onConnect(projectData._id, () => {});
        Socket.onConnection(() => {});
        Socket.onUserDisconnect((msg: any) =>
          console.log("User Disconnected > ", msg)
        );
        Socket.onFileLocked((msg: any) => {
          console.log("file_locked >", msg);
          dispatch(setLockedFilesPayload({ lockedFiles: msg }));
        });
        const editorEmail = localStorage.getItem("email");
        const editorName = localStorage.getItem("name");
        Socket.emitJoin({
          contributorName: editorName,
          contributorEmail: editorEmail,
          projectId: projectData._id,
        });
        Socket.onJoin((msg: any) => console.log("joined >", msg));
        return () => Socket.onSocketClose();
      }
    } catch (err) {
      console.log(err);
    }
  }, [projectData]);

  React.useEffect(() => {
    try {
      const editorEmail = localStorage.getItem("email");
      const editorName = localStorage.getItem("name");
      const Socket = new CustomSocket();
      if (codeData[0]?.code !== newCodeData[0]?.code) {
        setEnableSave(true);
        dispatch(setCodeChanged({ codeChanged: true }));
        Socket.emitFileLocked({
          name: openFileName,
          fileId: newCodeData[0].id,
          editorEmail: editorEmail,
          editorName: editorName,
          type: "lock",
        });
      } else {
        dispatch(setCodeChanged({ codeChanged: false }));
        Socket.emitFileLocked({
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
      const result = await getProjectFileDataById(projectData._id, nodeId);
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
    status: any,
    name: any
  ) => {
    console.log(name);
    try {
      const extension = name.split(".")[1];
      let codeData = "";
      if (extension === "js") {
        codeData = `
  
        const NewComp = () => {
          return (
            <div>Hello World from NewComp!</div>
          )
        }
        `;
      } else if (extension === "css") {
        codeData = `
  
        .temp-class {
          margin: 0;
          padding: 0;
        }
        `;
      } else if (extension === "html") {
        codeData = `
  
        <div className="temp-class"></div>
        `;
      }
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
          updateCodeDataForNewFile={updateCodeDataForNewFile}
          updateProjectCodeFileName={updateProjectCodeFileName}
          deleteProjectDataFun={deleteProjectDataFun}
          saveFileDataFun={saveFileDataFun}
          enableSaveBtn={enableSave}
          openFileName={openFileName}
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
  updateCodeDataForNewFile,
  updateProjectCodeFileName,
  deleteProjectDataFun,
  saveFileDataFun,
  openFileName,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [allCode, setAllCode] = React.useState("");
  const { showEditorSideBar, lockedFiles, showOutputSection } = useSelector(
    (state: RootState) => {
      return state.general;
    }
  );
  const {
    openProjectDetailModal,
    openContributorModal,
    openEditContributorModal,
  } = useSelector((state: RootState) => {
    return state.projectEditor;
  });
  useEffect(() => {
    if (showOutputSection) {
      fetchAllCode();
    }
  }, [showOutputSection]);

  const fetchAllCode = async () => {
    try {
      setLoading(true);
      const tempProjectData = await getProjectAllFilesData(projectData._id);
      setAllCode(tempProjectData.data);
      console.log(tempProjectData.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const email = localStorage.getItem("email");
  const projectMenu: Array<MenuItemsProp> = [
    {
      label: "Open Details",
      onClick: () => {
        dispatch(setOpenProjectDetailModal({ openProjectDetailModal: true }));
      },
    },
    {
      label: "Open Contributors",
      onClick: () => {
        dispatch(setOpenContributorModal({ openContributorModal: true }));
      },
    },
  ];

  if (email === projectData?.ownerEmail) {
    projectMenu.push({
      label: "Edit Contributors",
      onClick: () => {
        dispatch(
          setOpenEditContributorModal({ openEditContributorModal: true })
        );
      },
    });
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if ((event.ctrlKey || event.metaKey) && charCode === "s") {
      event.preventDefault();
      saveFileDataFun();
    }
  };

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
            updateCodeDataForNewFile={updateCodeDataForNewFile}
            updateProjectCodeFileName={updateProjectCodeFileName}
            deleteProjectData={deleteProjectDataFun}
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

        {!showOutputSection ? (
          <CodeEditor
            data={codeData}
            fileName={openFileName}
            setNewCode={(tempCode: any) => setNewCodeData(tempCode)}
          />
        ) : (
          <OutputConsole loading={loading} code={allCode} />
        )}
        <EditorFooterSection>
          <div
            className="clickable"
            onClick={() => {
              dispatch(
                setShowOutputSection({ showOutputSection: !showOutputSection })
              );
            }}
          >
            {!showOutputSection ? (
              <div>
                <MdPlayCircleOutline className="play" />
                <span>Run</span>
              </div>
            ) : (
              <div>
                <VscCode className="editor" />
                <span>Editor</span>
              </div>
            )}
          </div>
        </EditorFooterSection>
      </Layout>

      <ProjectDetailsModal
        title=""
        isModalVisible={openProjectDetailModal}
        closeModal={() =>
          dispatch(setOpenProjectDetailModal({ openProjectDetailModal: false }))
        }
        data={projectData}
      />
      <ContributorDetailModal
        title=""
        isModalVisible={openContributorModal}
        closeModal={() =>
          dispatch(setOpenContributorModal({ openContributorModal: false }))
        }
        contributors={projectData?.contributor}
      />
      <EditContributor
        title=""
        isModalVisible={openEditContributorModal}
        closeModal={() =>
          dispatch(
            setOpenEditContributorModal({ openEditContributorModal: false })
          )
        }
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
