import styled from "styled-components";

export const EditorFileName = styled.div`
  color: rgba(255, 20, 147, 1);
  background: rgba(255, 20, 147, 0.1);
  border-color: rgba(255, 20, 147, 1);
  width: fit-content;
  height: fit-content !important;
  padding: 0 1rem;
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  font-family: ${({ theme: { fonts } }) => fonts.primary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
`;
