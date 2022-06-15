import React, { useRef, useState } from "react";
import { AiOutlineFile, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsFileEarmarkLock } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";
// import { RootState } from "src/redux/store";
import { Button, CustomTooltip } from "src/components";
import { ConfirmationModal } from "src/common/Modals";
import {
  StyledFile,
  SelectedFileDot,
  ModalButtonContainer,
  FileLocked,
} from "src/components/CustomTree/File/TreeFile.style";
import { useTreeContext } from "src/components/CustomTree/state/TreeContext";
import {
  ActionsWrapper,
  StyledName,
} from "src/components/CustomTree/Tree.style.js";
import { PlaceholderInput } from "src/components/CustomTree/TreePlaceholderInput";

import { FILE } from "src/components/CustomTree/state/constants";
import FILE_ICONS from "src/components/CustomTree/FileIcons";

const File = ({
  name,
  id,
  node,
  setNewFiledIdAndType,
  setUpdatedFileName,
  openFileName,
}) => {
  const { dispatch, isImparative, onNodeClick } = useTreeContext();
  const [isEditing, setEditing] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const { codeChanged } = useSelector((state) => {
    return state.projectEditor;
  });
  const { lockedFiles } = useSelector((state) => {
    return state.general;
  });
  const lockedFile =
    lockedFiles.length > 0
      ? lockedFiles?.filter((lFile) => {
          return lFile.fileId == id;
        })
      : null;
  const ext = useRef("");

  let splitted = name?.split(".");
  ext.current = splitted[splitted.length - 1];

  const toggleEditing = () => setEditing(!isEditing);
  const commitEditing = (name) => {
    dispatch({ type: FILE.EDIT, payload: { id, name } });
    setUpdatedFileName(name);
    setNewFiledIdAndType(id, "folder", "edit");
    setEditing(false);
  };
  const commitDelete = () => {
    setNewFiledIdAndType(id, "folder", "deletion");
    dispatch({ type: FILE.DELETE, payload: { id } });
  };
  const handleNodeClick = (e) => {
    e.stopPropagation();
    if (codeChanged) {
      setOpenConfirmationModal(true);
    } else onNodeClick({ node, name });
  };
  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <>
      <StyledFile onClick={handleNodeClick} className="tree__file">
        {isEditing ? (
          <PlaceholderInput
            type="file"
            style={{ paddingLeft: 0 }}
            defaultValue={name}
            onSubmit={commitEditing}
            onCancel={handleCancel}
          />
        ) : (
          <ActionsWrapper>
            {openFileName === name && <SelectedFileDot />}
            <StyledName>
              {FILE_ICONS[ext.current] ? (
                FILE_ICONS[ext.current]
              ) : (
                <AiOutlineFile />
              )}
              &nbsp;&nbsp;{name}{" "}
              {lockedFile && lockedFile[0] && (
                <Tooltip
                  title={`Locked by ${lockedFile[0].editorName}`}
                  placement="right"
                >
                  <FileLocked>
                    <BsFileEarmarkLock />
                  </FileLocked>
                </Tooltip>
              )}
            </StyledName>
            {isImparative && (
              <div className="actions">
                <AiOutlineEdit onClick={toggleEditing} />
                <AiOutlineDelete onClick={commitDelete} />
              </div>
            )}
          </ActionsWrapper>
        )}
      </StyledFile>
      <ConfirmationModal
        isModalVisible={openConfirmationModal}
        closeModal={() => setOpenConfirmationModal(false)}
        handleOkModal={() => {
          onNodeClick({ node, name });
          setOpenConfirmationModal(false);
        }}
        title=""
        innerTitle="Important!"
      >
        <p>
          The code changes in current file havent been saved yet. Moving on to
          next file without saving the current would result in loss of written
          code.
        </p>
        <p>Are you sure you want to move to next file?</p>
        <ModalButtonContainer>
          <Button
            onClick={() => {
              onNodeClick({ node, name });
              setOpenConfirmationModal(false);
            }}
          >
            Yes
          </Button>
          <Button onClick={() => setOpenConfirmationModal(false)}>
            Cancel
          </Button>
        </ModalButtonContainer>
      </ConfirmationModal>
    </>
  );
};

export { File };
