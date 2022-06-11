import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import Editor from "@monaco-editor/react";
import { setNewCodeData } from "src/pages/Editor/slice";

export interface Props {
  data?: any;
  setNewCode: (tempCode: any) => void;
}
const CodeEditor: React.FC<Props> = ({ data, setNewCode }) => {
  const editorRef = React.useRef(null);
  const dispatch = useDispatch();
  const codeData = data && data.length > 0 ? data[0]?.code : "";
  const [lockFile, setLockFile] = React.useState(false);
  const [code, setCode] = React.useState(codeData);
  const { lockedFiles } = useSelector((state: RootState) => {
    return state.general;
  });
  // console.log("projectData >", projectData);
  // useEffect(() => {
  //   if (monaco) {
  //     console.log("here is the monaco instance:", monaco);
  //   }
  // }, [monaco]);

  useEffect(() => {
    setCode(codeData);
  }, [data]);

  useEffect(() => {
    if (lockedFiles.length > 0) {
      console.log(">>", data[0].id);
      const tempFile = lockedFiles.find((lFile) => lFile.fileId == data[0].id);
      const email = localStorage.getItem("email");
      console.log("-->>", lockedFiles);
      console.log("-->>", email);
      console.log(">> ", tempFile);
      const notMyFile = tempFile?.editorEmail
        ? tempFile?.editorEmail !== email
        : false;
      console.log("notMyFile >>", notMyFile);
      setLockFile(notMyFile);
    } else setLockFile(false);
  }, [lockedFiles]);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  console.log("editorRef >", editorRef);

  // useEffect(() => {
  //   try {
  //     if (codeData !== code) {
  //       console.log("code changed");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [data, code]);

  const handleEditorChange = (value: any) => {
    if (!lockFile) {
      setCode(value);
      setNewCode([{ id: data[0].id, code: value }]);
    }
  };
  // console.log("Inside code editor >>>>>> ", data);

  const editorOptions = {
    // value: code,
    language: "javascript",
    theme: "vs-light",
    automaticLayout: true,
    minimap: {
      enabled: false,
    },
    fontFamily: "Mulish, sans-serif !important",
    fontSize: 14,
    tabSize: 2,
    readOnly: lockFile,
  };

  return (
    <>
      <Editor
        height="100%"
        width="100%"
        // defaultValue={code}
        value={code}
        defaultLanguage="javascript"
        options={editorOptions}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
      />
    </>
  );
};

export default CodeEditor;
