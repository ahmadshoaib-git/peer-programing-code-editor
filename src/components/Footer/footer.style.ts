import styled from "styled-components";

export const FooterWrapper = styled.footer`
  border: 1px solid ${({ theme: { colors } }) => colors.borderWhite};
  font-family: ${({ theme: { fonts } }) => fonts.secondary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.subHeading};
  width: ${({ theme: { layout } }) => layout.footer.width};
  height: ${({ theme: { layout } }) => layout.footer.height};
`;
