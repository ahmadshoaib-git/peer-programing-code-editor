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
  justify-content: space-between;
  align-items: center;
  .ant-tag {
    color: rgba(255, 20, 147, 1);
    background: rgba(255, 20, 147, 0.1);
    border-color: rgba(255, 20, 147, 1);
    line-height: 1.5;
    margin-right: 10px;
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
    display: flex;
    align-items: center;
    span {
      padding-left: 0.3rem;
    }
    svg {
      padding-left: 0.3rem;
      font-size: ${({ theme: { fontSizes } }) => fontSizes.subHeading};
      color: rgba(255, 20, 147, 1);
    }
  }
`;
