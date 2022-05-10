import styled from "styled-components";

export const HeaderWrapper = styled.header`
  border: 1px solid ${({ theme: { colors } }) => colors.borderWhite};
  font-family: ${({ theme: { fonts } }) => fonts.secondary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.subHeading};
  width: ${({ theme: { layout } }) => layout.header.width};
  height: ${({ theme: { layout } }) => layout.header.height};
`;
