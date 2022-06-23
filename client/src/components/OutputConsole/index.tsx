import React from "react";
import { Container } from "./outputConsole.style";
import PageLoader from "../PageLoader";
export interface Props {
  loading: Boolean;
  code: String;
}

const OutputConsole: React.FC<Props> = ({ loading, code }) => {
  const reconstructHTML = `
  <!DOCTYPE>
<html>
<head>
  <script src="https://unpkg.com/react/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    ${code}
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
