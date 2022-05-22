import React from "react";
import Theme from "src/theme";
import { Provider } from "react-redux";
import store from "./redux/store";
import GlobalStyle from "src/assets/styles/global.style";
// import Editor from "./pages/Editor";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
import Routes from "src/routes";

function App() {
  return (
    <Provider store={store}>
      <Theme>
        <GlobalStyle />
        {/* <Editor /> */}
        {/* <Login /> */}
        {/* <Home /> */}
        <Routes />
      </Theme>
    </Provider>
  );
}

export default App;
