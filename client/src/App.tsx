import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import Theme from "src/theme";
import { Provider } from "react-redux";
import store from "./redux/store";
import GlobalStyle from "src/assets/styles/global.style";
import Routes from "src/routes";
// import { useDispatch } from "react-redux";
// import { setLoggedIn } from "src/redux/slices/auth";
// import { jwtInterceptor, responseInterceptor } from "src/utils/interceptors";
import "react-toastify/ReactToastify.min.css";

function App() {
  console.log("===> App");
  // const dispatch = useDispatch();
  // React.useEffect(() => {
  //   jwtInterceptor();
  //   responseInterceptor(() => {
  //     dispatch(setLoggedIn({ loggedIn: false }));
  //     window.location.href = "/login";
  //   });
  // }, []);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Theme>
          <GlobalStyle />
          <Routes />
          <ToastContainer position="bottom-right" newestOnTop />
        </Theme>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
