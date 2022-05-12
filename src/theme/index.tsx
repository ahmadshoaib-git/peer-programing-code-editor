import { ThemeProvider } from "styled-components";
export interface Props {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
}
const theme = {
  colors: {
    black: "#1c2d41",
    white: "#FFFFFF",
    borderWhite: "#cfcfcf",
    tooltipColor: "#2f54eb",
    tooltipBackground: "rgb(47 84 235 / 10%)",
    headingColor: "rgb(2, 122, 255)",
  },
  fonts: {
    primary: `'Mulish', sans-serif`,
    secondary: `'Mulish', sans-serif`,
    heading: `'Macondo', cursive`,
  },
  fontSizes: {
    basic: "0.6rem",
    paragraph: "0.8rem",
    subHeading: "1rem",
    icon: "1.3rem",
    heading: "1.4rem",
  },
  layout: {
    innerLayout: {
      width: "calc(100% - 3.5rem)",
      height: "100vh",
    },
    header: {
      width: "100%",
      height: "2.5rem",
    },
    outerSideBar: {
      width: "3.5rem",
      height: "100vh",
    },
    main: {
      width: "100%",
      height: "calc(100% - 5rem)",
    },
    footer: {
      width: "100%",
      height: "2.5rem",
    },
    iconButton: {
      height: "2rem",
      width: "2.2rem",
    },
  },
};

const Theme: React.FC<Props> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
