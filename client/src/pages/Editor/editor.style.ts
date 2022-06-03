import styled from "styled-components";

export const EditorFileName = styled.div`
  background: ${({ theme: { colors } }) => `${colors.headingColor}!important`};

  color: ${({ theme: { colors } }) => `${colors.white}!important`};

  border-color: ${({ theme: { colors } }) =>
    `${colors.headingColor}!important`};

  width: 100%;
  height: fit-content !important;
  padding: 0 1rem;
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  text-align: right;
  font-family: ${({ theme: { fonts } }) => fonts.primary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
`;
