import React from "react";
import { ToastContainer } from "react-toastify";
import Theme from "src/theme";
import { Provider } from "react-redux";
import store from "./redux/store";
import GlobalStyle from "src/assets/styles/global.style";
// import Editor from "./pages/Editor";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
import Routes from "src/routes";
// import Notify from "src/components/Notification";
import "react-toastify/ReactToastify.min.css";

function App() {
  // React.useEffect(() => {
  //   Notify("Yahooo!!!!", "info");
  // }, []);
  return (
    <Provider store={store}>
      <Theme>
        <GlobalStyle />
        {/* <Editor /> */}
        {/* <Login /> */}
        {/* <Home /> */}
        <Routes />
        <ToastContainer position="bottom-right" newestOnTop />
      </Theme>
    </Provider>
  );
}

export default App;
