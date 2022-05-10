import styled from "styled-components";

export const MainWrapper = styled.main`
  border: 1px solid ${({ theme: { colors } }) => colors.borderWhite};
  font-family: ${({ theme: { fonts } }) => fonts.secondary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.subHeading};
  width: ${({ theme: { layout } }) => layout.main.width};
  height: ${({ theme: { layout } }) => layout.main.height};
`;
