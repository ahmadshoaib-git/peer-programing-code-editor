import { ThemeProvider } from "styled-components";
export interface Props {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
}
const theme = {
  colors: {
    white: "#FFFFFF",
    borderWhite: "#cfcfcf",
    tooltipColor: "#2f54eb",
  },
  fonts: {
    primary: "sans-serif",
    secondary: "Roboto",
  },
  fontSizes: {
    paragraph: "0.8em",
    subHeading: "1em",
    icon: "1.6em",
    heading: "2em",
  },
  layout: {
    innerLayout: {
      width: "calc(100% - 3rem)",
      height: "100vh",
    },
    header: {
      width: "100%",
      height: "3rem",
    },
    outerSideBar: {
      width: "3rem",
      height: "100vh",
    },
    main: {
      width: "100%",
      height: "calc(100% - 6rem)",
    },
    footer: {
      width: "100%",
      height: "3rem",
    },
  },
};

const Theme: React.FC<Props> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
