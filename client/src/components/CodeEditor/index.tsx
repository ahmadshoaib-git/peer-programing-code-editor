import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import Editor from "@monaco-editor/react";
import { setNewCodeData } from "src/pages/Editor/slice";

export interface Props {
  data?: any;
  fileName: any;
  setNewCode: (tempCode: any) => void;
}
const CodeEditor: React.FC<Props> = ({ data, fileName, setNewCode }) => {
  const editorRef = React.useRef(null);
  const dispatch = useDispatch();
  const codeData = data && data.length > 0 ? data[0]?.code : "";
  const [lockFile, setLockFile] = React.useState(false);
  const [code, setCode] = React.useState(codeData);
  const { lockedFiles } = useSelector((state: RootState) => {
    return state.general;
  });
  let fileType = "javascript";
  try {
    if (fileName.split(".")[1] === "js") fileType = "javascript";
    else if (fileName.split(".")[1] === "css") fileType = "css";
    else if (fileName.split(".")[1] === "html") fileType = "html";
  } catch (err) {
    console.log(err);
  }

  useEffect(() => {
    setCode(codeData);
  }, [data]);

  useEffect(() => {
    if (lockedFiles.length > 0) {
      const tempFile = lockedFiles.find((lFile) => lFile.fileId == data[0].id);
      const email = localStorage.getItem("email");
      const notMyFile = tempFile?.editorEmail
        ? tempFile?.editorEmail !== email
        : false;
      setLockFile(notMyFile);
    } else setLockFile(false);
  }, [lockedFiles]);

  console.log(fileName, fileType);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  const handleEditorChange = (value: any) => {
    if (!lockFile) {
      setCode(value);
      setNewCode([{ id: data[0].id, code: value }]);
    }
  };

  const editorOptions = {
    // value: code,
    language: fileType,
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

  // useEffect(() => {
  //   const model:any = editorRef?.current?.monaco.editor.getModel();
  //   editorRef?.current?.editor?.setModelLanguage(model, lang);
  // },[editorRef?.current]);

  console.log("editorRef >", editorRef);

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
