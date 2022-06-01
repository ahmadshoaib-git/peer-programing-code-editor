import React, { useState, useEffect } from "react";
import {
  AiOutlineFolderAdd,
  AiOutlineFileAdd,
  AiOutlineFolder,
  AiOutlineFolderOpen,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";

import {
  ActionsWrapper,
  Collapse,
  StyledName,
  VerticalLine,
} from "src/components/NewTree/Tree.style";
import { StyledFolder } from "./TreeFolder.style";

import { PlaceholderInput } from "src/components/NewTree/TreePlaceholderInput";

const FolderName = ({ isOpen, name, handleClick }) => (
  <StyledName onClick={handleClick}>
    {isOpen ? <AiOutlineFolderOpen /> : <AiOutlineFolder />}
    &nbsp;&nbsp;{name}
  </StyledName>
);

const Folder = ({
  id,
  name,
  children,
  node,
  onNodeClick,
  addFile,
  addFolder,
}) => {
  // const { dispatch, isImparative, onNodeClick } = useTreeContext();
  const [isEditing, setEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [childs, setChilds] = useState([]);

  useEffect(() => {
    setChilds([children]);
  }, [children]);
  console.log("childs >", childs);

  const commitFolderCreation = (name) => {
    addFolder({
      id: id,
      name: name,
    });
    console.log("commitFolderCreation", id, " -- ", name);
    // setEditing(false);
  };
  const commitFileCreation = (name) => {
    addFile(
      {
        id: id,
        name: name,
        type: "file",
      },
      () => {
        setEditing(false);
        // setIsOpen(false);
      }
    );
    console.log("commitFileCreation", id, " -- ", name);
    // setEditing(false);
  };
  const commitDeleteFolder = () => {
    console.log("commitDeleteFolder", id, " -- ");
  };
  const commitFolderEdit = (name) => {
    console.log("commitFolderEdit", id, " -- ", name);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setChilds([children]);
  };

  const handleNodeClick = React.useCallback(
    (event) => {
      event.stopPropagation();
      console.log(name, id, node, onNodeClick);
      onNodeClick({ node });
    },
    [node]
  );

  const handleFileCreation = (event) => {
    event.stopPropagation();
    setIsOpen(true);
    setChilds([
      ...childs,
      <PlaceholderInput
        type="file"
        onSubmit={commitFileCreation}
        onCancel={handleCancel}
      />,
    ]);
  };

  const handleFolderCreation = (event) => {
    event.stopPropagation();
    setIsOpen(true);
    setChilds([
      ...childs,
      <PlaceholderInput
        type="folder"
        onSubmit={commitFolderCreation}
        onCancel={handleCancel}
      />,
    ]);
  };

  const handleFolderRename = () => {
    setIsOpen(true);
    setEditing(true);
  };

  return (
    <StyledFolder id={id} onClick={handleNodeClick} className="tree__folder">
      <VerticalLine>
        <ActionsWrapper>
          {isEditing ? (
            <PlaceholderInput
              type="folder"
              style={{ paddingLeft: 0 }}
              defaultValue={name}
              onCancel={handleCancel}
              onSubmit={commitFolderEdit}
            />
          ) : (
            <FolderName
              name={name}
              isOpen={isOpen}
              handleClick={() => setIsOpen(!isOpen)}
            />
          )}
          <div className="actions">
            <AiOutlineEdit onClick={handleFolderRename} />
            <AiOutlineFileAdd onClick={handleFileCreation} />
            <AiOutlineFolderAdd onClick={handleFolderCreation} />
            <AiOutlineDelete onClick={commitDeleteFolder} />
          </div>
        </ActionsWrapper>
        <Collapse className="tree__folder--collapsible" isOpen={isOpen}>
          {childs}
        </Collapse>
      </VerticalLine>
    </StyledFolder>
  );
};

export { Folder, FolderName };
