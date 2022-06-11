import styled from "styled-components/macro";

export const StyledFile = styled.div`
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  font-weight: normal;
  padding-left: ${(p) => p.theme.indent}px;
`;

export const SelectedFileDot = styled.div`
  display: inline-block;
  /* margin-right: 0.3rem; */
  position: absolute;
  left: -10px;
  height: 0.4rem;
  width: 0.4rem;
  border-radius: 0.4rem;
  background: ${({ theme: { colors } }) => `${colors.headingColor}!important`};
  border-color: ${({ theme: { colors } }) =>
    `${colors.headingColor}!important`};
`;

export const FileLocked = styled.div`
  display: inline-block;
  padding-left: 0.3rem;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
  color: ${({ theme: { colors } }) => `${colors.pink}!important`};
  position: relative;
  width: 12px;
  height: 10px;
  svg {
    position: absolute;
    top: -0.2rem;
    left: 0.5rem;
  }
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: fit-content;
  padding-top: 1rem;
  button {
    width: 6rem;
    background: ${({ theme: { colors } }) =>
      `${colors.headingColor}!important`};
    color: ${({ theme: { colors } }) => `${colors.white}!important`};
    border-color: ${({ theme: { colors } }) =>
      `${colors.headingColor}!important`};
    font-family: ${({ theme: { fonts } }) => fonts.primary};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
  }
  /* button:nth-child(1) {
    &:hover {
      background: ${({ theme: { colors } }) => `${colors.white}!important`};
      color: ${({ theme: { colors } }) => `${colors.headingColor}!important`};
    }
  } */
  button:nth-child(2) {
    background: ${({ theme: { colors } }) => `${colors.white}!important`};
    color: ${({ theme: { colors } }) => `${colors.headingColor}!important`};
    /* &:hover {
      background: ${({ theme: { colors } }) =>
      `${colors.headingColor}!important`};
      color: ${({ theme: { colors } }) => `${colors.white}!important`};
    } */
  }
`;
