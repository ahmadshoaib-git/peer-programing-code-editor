import React from "react";
import { Container } from "./outputConsole.style";
import PageLoader from "../PageLoader";
export interface Props {
  loading: boolean;
  code: any;
  dependencyFile: Array<any>;
}

const OutputConsole: React.FC<Props> = ({ loading, code, dependencyFile }) => {
  console.log("dependencyFile >", dependencyFile);
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
  const dependencies = dependencyFile?.reduce((str: any, data: any) => {
    str = `${str} <script src=${data.cdn}></script>`;
    return str;
  }, "");
  console.log("html >", html);
  console.log("css >", css);
  console.log("js >", js);
  console.log("dependencies >", dependencies);
  const reconstructHTML = `
  <!DOCTYPE>
<html>
<head>
  ${dependencies}
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
