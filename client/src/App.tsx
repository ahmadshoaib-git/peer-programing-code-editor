import React from "react";
import { ToastContainer } from "react-toastify";
import Theme from "src/theme";
import { Provider } from "react-redux";
import store from "./redux/store";
import GlobalStyle from "src/assets/styles/global.style";
import Routes from "src/routes";
import "react-toastify/ReactToastify.min.css";

function App() {
  console.log("===> App");
  return (
    <Provider store={store}>
      <Theme>
        <GlobalStyle />
        <Routes />
        <ToastContainer position="bottom-right" newestOnTop />
      </Theme>
    </Provider>
  );
}

export default App;
