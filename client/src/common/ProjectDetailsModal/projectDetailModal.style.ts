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

export const CustomEmpty = styled(Empty)`
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 20, 147, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .ant-empty-image {
    margin: 0;
  }
`;

export const InfoList = styled.ul`
  width: 100%;
  padding: 0.6rem 0.7rem;
  box-shadow: rgb(52 141 214 / 10%) 2px 3px 10px 4px;
  li {
    font-family: ${({ theme: { fonts } }) => fonts.paragraph};
    font-size: 0.7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .highlight {
      color: rgba(255, 20, 147, 1);
      font-weight: 700;
    }
    .flex {
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        margin-right: 0.5rem;
      }
    }
  }
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
`;

export const ListWrapper = styled.div`
  width: 100%;
  height: 16rem;
  overflow-y: auto;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const CustomModalList = styled.ul`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 0.5rem;
    .detail-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0.4rem 0.5rem;
      box-shadow: rgb(52 141 214 / 10%) 2px 3px 10px 4px;
      border-radius: 0.4rem;
      div {
        display: flex;
        align-items: center;
        gap: 1rem;
        span {
          font-size: 0.7rem;
          font-family: "Mulish", sans-serif;
        }
        .title {
          width: 3rem;
        }
        .highlight {
          color: rgba(255, 20, 147, 1);
          font-weight: 700;
        }
      }
    }
  }
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
