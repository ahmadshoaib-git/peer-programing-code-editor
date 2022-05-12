import React, { useEffect } from "react";

import Editor, { useMonaco } from "@monaco-editor/react";

function CodeEditor() {
  const monaco = useMonaco();
  const defaultCode = `
  import React, {useState} from "react";

const ProjectX = () => {
  return (
    <div>ProjectX</div>
  )
}

export default ProjectX;
  `;

  useEffect(() => {
    // do conditional chaining
    // monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    // or make sure that it exists by other ways
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);

  return (
    <>
      <Editor
        height="100%"
        width="100%"
        defaultValue={defaultCode}
        defaultLanguage="javascript"
      />
    </>
  );
}

export default CodeEditor;
