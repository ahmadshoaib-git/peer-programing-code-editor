import React from "react";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { VscSymbolFile } from "react-icons/vsc";
import { CustomCollapse, CustomPanel } from "./collapse.style";

const Collapse = () => {
  function callback(key: any) {
    console.log(key);
  }
  const genExtra = () => (
    // <SettingOutlined
    // onClick={event => {
    //   // If you don't want click extra trigger collapse, you can prevent this:
    //   event.stopPropagation();
    // }}
    // />
    <VscSymbolFile
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        alert("Clicked");
        event.stopPropagation();
      }}
    />
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
        <div>{text}</div>
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

export default Collapse;
