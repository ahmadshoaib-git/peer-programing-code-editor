import React, { useRef, useState } from "react";
import { AiOutlineFile, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import { StyledFile } from "src/components/NewTree/File/TreeFile.style";
import {
  ActionsWrapper,
  StyledName,
} from "src/components/NewTree/Tree.style.js";
import { PlaceholderInput } from "src/components/NewTree/TreePlaceholderInput";

import FILE_ICONS from "src/components/NewTree/FileIcons";

const File = ({ name, id, node, onNodeClick }) => {
  // console.log(name, id, node, onNodeClick);
  // const { dispatch, isImparative, onNodeClick } = useTreeContext();
  const [isEditing, setEditing] = useState(false);
  const ext = useRef("");

  console.log("isEditing >>", isEditing);

  let splitted = name?.split(".");
  ext.current = splitted[splitted.length - 1];

  const toggleEditing = () => setEditing(!isEditing);
  const commitEditing = (name) => {
    console.log("commitEditing >", name);
    setEditing(false);
  };
  const commitDelete = () => {
    console.log("deleting file");
    // dispatch({ type: FILE.DELETE, payload: { id } });
  };
  const handleNodeClick = React.useCallback(
    (e) => {
      e.stopPropagation();
      console.log(name, id, node, onNodeClick);
      onNodeClick({ node }, () => setEditing(false));
    },
    [node]
  );
  const handleCancel = () => {
    setEditing(false);
  };

  return (
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
          <StyledName>
            {FILE_ICONS[ext.current] ? (
              FILE_ICONS[ext.current]
            ) : (
              <AiOutlineFile />
            )}
            &nbsp;&nbsp;{name}
          </StyledName>
          <div className="actions">
            <AiOutlineEdit onClick={toggleEditing} />
            <AiOutlineDelete onClick={commitDelete} />
          </div>
        </ActionsWrapper>
      )}
    </StyledFile>
  );
};

export { File };
