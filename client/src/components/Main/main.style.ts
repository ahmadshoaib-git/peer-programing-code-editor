import styled from "styled-components";

interface SidebarProps {
  noSideBar: boolean;
}
export const MainWrapper = styled.main<SidebarProps>`
  /* border: 2px solid ${({ theme: { colors } }) => colors.borderWhite}; */
  box-shadow: rgb(52 141 214 / 10%) 2px 3px 10px 4px;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  font-family: ${({ theme: { fonts } }) => fonts.secondary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.subHeading};
  color: ${({ theme: { colors } }) => colors.black};
  width: ${({ theme: { layout } }) => layout.main.width};
  height: ${({ theme: { layout } }) => layout.main.height};
  display: flex;
  /* padding-bottom: 1rem; */
  .inner-section {
    width: ${({ noSideBar, theme: { layout } }) =>
      noSideBar ? "100%" : layout.Editor.width};
    position: relative;
    height: 100%;
    /* padding: 1rem; */
    padding-right: 0;
    overflow-y: hidden;
    > section {
      margin-top: 2%;
      height: 98%;
      /* display: flex;
      align-items: flex-end; */
    }
    > div {
      height: 100%;
    }
  }
`;
