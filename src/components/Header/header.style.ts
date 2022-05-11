import styled from "styled-components";

export const HeaderWrapper = styled.header`
  outline: 0;
  border: 0;
  font-family: ${({ theme: { fonts } }) => fonts.secondary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.subHeading};
  width: ${({ theme: { layout } }) => layout.header.width};
  height: ${({ theme: { layout } }) => layout.header.height};
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* .ant-avatar-group {
    padding-right: 0.8rem;
  } */
  /* > h1 {
    font-family: ${({ theme: { fonts } }) => fonts.heading};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.heading};
  } */
`;

export const HeaderHeading = styled.h1`
  font-family: ${({ theme: { fonts } }) => fonts.heading};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.heading};
  font-weight: bold;
  color: ${({ theme: { colors } }) => colors.headingColor};
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

export const HeaderRightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  div,
  button {
    margin-right: 0.4rem;
  }
`;
