import styled from "styled-components";

export const CustomEditorSideBarWrapper = styled.div`
  min-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const CustomEditorSideBarHeader = styled.div`
  height: 2.5rem;
  width: 100%;
  /* background-color: #1c14ff1a; */
  padding: 0.3rem;
  display: flex;
  align-items: center;
  svg {
    padding-left: 0.3rem;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.subHeading};
    color: rgba(255, 20, 147, 1);
  }
  h2 {
    padding: 0;
    margin: 0;
    color: ${({ theme: { colors } }) => colors.black};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
    font-family: ${({ theme: { fonts } }) => fonts.primary};
    font-weight: 600;
    padding-left: 0.3rem;
    cursor: pointer;
  }
`;
