import styled from "styled-components";

export const HeaderWrapper = styled.header`
  outline: 0;
  border: 0;
  font-family: ${({ theme: { fonts } }) => fonts.secondary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.subHeading};
  width: ${({ theme: { layout } }) => layout.header.width};
  height: ${({ theme: { layout } }) => layout.header.height};
`;
