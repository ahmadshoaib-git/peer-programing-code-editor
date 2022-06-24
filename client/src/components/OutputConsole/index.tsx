import React from "react";
import { Container } from "./outputConsole.style";
import PageLoader from "../PageLoader";
export interface Props {
  loading: Boolean;
  code: any;
}

const OutputConsole: React.FC<Props> = ({ loading, code }) => {
  let html = code?.html?.reduce((str: any, currentStr: any) => {
    str = `${str} ${currentStr}`;
    return str;
  }, "");
  let css = code?.css?.reduce((str: any, currentStr: any) => {
    str = `${str} ${currentStr}`;
    return str;
  }, "");
  let js = code?.js?.reduce((str: any, currentStr: any) => {
    str = `${str} ${currentStr}`;
    return str;
  }, "");
  console.log("html >", html);
  console.log("css >", css);
  console.log("js >", js);
  const reconstructHTML = `
  <!DOCTYPE>
<html>
<head>
  <script src="https://unpkg.com/react/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
  <style>
    ${css ? css : ""}
  </style>
</head>
<body>
  <div id="root"></div>
  ${html ? html : ""}
  <script type="text/babel">
  ${js ? js : ""}
    const root = document.querySelector('#root');
    ReactDOM.render(<App />, root);

  </script>
</body>
</html>
  `;
  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <Container>
          <iframe srcDoc={reconstructHTML}></iframe>
        </Container>
      )}
    </>
  );
};

export default OutputConsole;
