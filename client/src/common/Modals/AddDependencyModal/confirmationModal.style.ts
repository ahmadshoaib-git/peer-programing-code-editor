import styled from "styled-components";
import { Empty } from "antd";

export const FormContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;

export const HeaderHeading = styled.h1`
  font-family: ${({ theme: { fonts } }) => fonts.paragraph};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.subHeading};
  text-transform: uppercase;
  font-weight: bold;
  color: ${({ theme: { colors } }) => colors.headingColor};
  margin: 0;
  padding: 0;
  cursor: pointer;
  margin-bottom: 1rem;
  svg {
    color: black;
    margin-right: 0.3rem;
    padding-top: 0.2rem;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: fit-content;
  overflow-y: auto;
  padding: 1rem;
`;

export const ContributorHeadingWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 0 1rem; */
  h3 {
    font-family: ${({ theme: { fonts } }) => fonts.subHeading};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
    font-weight: bold;
    margin: 0;
    display: flex;
    align-items: center;
    svg {
      margin-right: 0.5rem;
    }
  }
`;
