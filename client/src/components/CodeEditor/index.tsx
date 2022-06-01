import React, { useEffect } from "react";

import Editor, { useMonaco } from "@monaco-editor/react";

export interface Props {
  data?: any;
}
const CodeEditor: React.FC<Props> = ({ data }) => {
  const monaco = useMonaco();
  useEffect(() => {
    // do conditional chaining
    // monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    // or make sure that it exists by other ways
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);
  const codeData = data[0]?.code;
  console.log(data);

  const editorOptions = {
    value: codeData,
    language: "javascript",
    theme: "vs-light",
    automaticLayout: true,
    minimap: {
      enabled: false,
    },
    fontFamily: "Mulish, sans-serif !important",
    fontSize: 14,
    tabSize: 2,
  };

  return (
    <>
      <Editor
        height="100%"
        width="100%"
        defaultValue={codeData}
        defaultLanguage="javascript"
        options={editorOptions}
      />
    </>
  );
};

export default CodeEditor;
