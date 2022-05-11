import styled from "styled-components";

export const FooterWrapper = styled.footer`
  outline: 0;
  border: 0;
  font-family: ${({ theme: { fonts } }) => fonts.secondary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.subHeading};
  width: ${({ theme: { layout } }) => layout.footer.width};
  height: ${({ theme: { layout } }) => layout.footer.height};
  display: flex;
  justify-content: center;
  align-items: center;
`;
