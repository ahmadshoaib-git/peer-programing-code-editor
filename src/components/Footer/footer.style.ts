import styled from "styled-components";

export const FooterWrapper = styled.footer`
  outline: 0;
  border: 0;
  padding-top: 0.1rem;
  font-family: ${({ theme: { fonts } }) => fonts.secondary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
  width: ${({ theme: { layout } }) => layout.footer.width};
  height: ${({ theme: { layout } }) => layout.footer.height};
  color: ${({ theme: { colors } }) => colors.black};
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
`;
