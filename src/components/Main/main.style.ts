import styled from "styled-components";

export const MainWrapper = styled.main`
  /* border: 2px solid ${({ theme: { colors } }) => colors.borderWhite}; */
  box-shadow: rgb(52 141 214 / 10%) 0px 4px 5px 5px;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  font-family: ${({ theme: { fonts } }) => fonts.secondary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.subHeading};
  width: ${({ theme: { layout } }) => layout.main.width};
  height: ${({ theme: { layout } }) => layout.main.height};
`;
