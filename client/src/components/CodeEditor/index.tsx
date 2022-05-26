import React, { useEffect } from "react";

import Editor, { useMonaco } from "@monaco-editor/react";

function CodeEditor() {
  const monaco = useMonaco();
  useEffect(() => {
    // do conditional chaining
    // monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    // or make sure that it exists by other ways
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);
  const codeData = `
  import React, {useState} from "react";

const ProjectX = () => {
  return (
    <div>ProjectX</div>
  )
}

export default ProjectX;
  `;

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
}

export default CodeEditor;
