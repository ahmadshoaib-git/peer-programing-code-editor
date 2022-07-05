import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import Editor from "@monaco-editor/react";
import { setNewCodeData } from "src/pages/Editor/slice";

const CodeEditor = () => {
  const { fileOpenedName, codeData } = useSelector((state: RootState) => {
    return state.projectEditor;
  });
  const editorRef = React.useRef(null);
  const dispatch = useDispatch();

  const [lockFile, setLockFile] = React.useState(false);
  const [code, setCode] = React.useState("");
  const { lockedFiles } = useSelector((state: RootState) => {
    return state.general;
  });
  let fileType = "javascript";
  try {
    if (fileOpenedName.split(".")[1] === "js") fileType = "javascript";
    else if (fileOpenedName.split(".")[1] === "css") fileType = "css";
    else if (fileOpenedName.split(".")[1] === "html") fileType = "html";
  } catch (err) {
    console.log(err);
  }

  useEffect(() => {
    if (codeData[0]) setCode(codeData[0]?.code);
  }, [codeData]);

  useEffect(() => {
    if (lockedFiles.length > 0) {
      const tempFile = lockedFiles.find(
        (lFile) => lFile.fileId == codeData[0].id
      );
      const email = localStorage.getItem("email");
      const notMyFile = tempFile?.editorEmail
        ? tempFile?.editorEmail !== email
        : false;
      setLockFile(notMyFile);
    } else setLockFile(false);
  }, [lockedFiles]);

  console.log(fileOpenedName, fileType);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  const handleEditorChange = (value: any) => {
    if (!lockFile) {
      setCode(value);
      const data = [{ id: codeData[0].id, code: value }];
      dispatch(setNewCodeData({ newCodeData: data }));
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
        defaultLanguage={fileType}
        options={editorOptions}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
      />
    </>
  );
};

export default CodeEditor;
