import React, { useState, useEffect, useLayoutEffect } from "react";
import Tree from "../Tree";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { VscSymbolFile } from "react-icons/vsc";
import { structure } from "./folderStructure.config";
import { CustomCollapse, CustomPanel } from "./collapse.style";

const Collapse = () => {
  /*********Folder Structure  ************/
  let [data, setData] = useState(structure);

  const handleClick = (node) => {
    console.log(node);
  };
  const handleUpdate = (state) => {
    localStorage.setItem(
      "tree",
      JSON.stringify(state, function (key, value) {
        if (key === "parentNode" || key === "id") {
          return null;
        }
        return value;
      })
    );
  };

  useLayoutEffect(() => {
    try {
      let savedStructure = JSON.parse(localStorage.getItem("tree") || "[]");
      if (savedStructure.length > 0) {
        setData(savedStructure);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  /************************************* */

  function callback(key) {
    console.log(key);
  }
  const genExtra = () => (
    // <SettingOutlined
    // onClick={event => {
    //   // If you don't want click extra trigger collapse, you can prevent this:
    //   event.stopPropagation();
    // }}
    // />
    /***********ICON********* */
    // <VscSymbolFile
    //   onClick={(event) => {
    //     // If you don't want click extra trigger collapse, you can prevent this:
    //     alert("Clicked");
    //     event.stopPropagation();
    //   }}
    // />
    /***************** */
    <></>
  );
  const text = "This is a dummy text";
  return (
    <CustomCollapse
      defaultActiveKey={["1"]}
      onChange={callback}
      expandIconPosition={"left"}
      expandIcon={({ isActive }) =>
        isActive ? <IoMdArrowDropdown /> : <IoMdArrowDropright />
      }
    >
      <CustomPanel header="Files" key="1" extra={genExtra()}>
        <div>
          <Tree data={data} onUpdate={handleUpdate} onNodeClick={handleClick} />
        </div>
      </CustomPanel>
      <CustomPanel header="Dependencies" key="2" extra={genExtra()}>
        <div>{text}</div>
      </CustomPanel>
      <CustomPanel header="External Resources" key="3" extra={genExtra()}>
        <div>{text}</div>
      </CustomPanel>
    </CustomCollapse>
  );
};

export default React.memo(Collapse);
