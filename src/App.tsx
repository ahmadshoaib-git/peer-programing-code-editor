import React from "react";
import Theme from "src/theme";
import GlobalStyle from "src/assets/styles/global.style";
import Editor from "./pages/Editor";

function App() {
  return (
    <Theme>
      <GlobalStyle />
      <Editor />
    </Theme>
  );
}

export default App;
