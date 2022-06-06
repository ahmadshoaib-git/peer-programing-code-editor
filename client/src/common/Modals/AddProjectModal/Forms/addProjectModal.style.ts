import styled from "styled-components";
import { Empty } from "antd";

export const LoginWrapper = styled.div`
  min-height: 100v;
  min-width: 100%;
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const CustomEmpty = styled(Empty)`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme: { colors } }) => colors.pink};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .ant-empty-image {
    margin: 0;
  }
`;

export const LoginLeftContainer = styled.div`
  min-height: 100vh;
  min-width: 50%;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1111;
  background: #fff;
  @media only screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const LoginRightContainer = styled.div`
  min-height: 100vh;
  min-width: 50%;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  @media only screen and (max-width: 600px) {
    display: none !important;
  }
  .bg {
    animation: slide 3s ease-in-out infinite alternate;
    background-image: linear-gradient(-60deg, #6c3 50%, #09f 50%);
    bottom: 0;
    left: -50%;
    opacity: 0.5;
    position: fixed;
    right: -50%;
    top: 0;
    z-index: -1;
  }

  .bg2 {
    animation-direction: alternate-reverse;
    animation-duration: 4s;
  }

  .bg3 {
    animation-duration: 5s;
  }

  .content {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 0.25em;
    box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    left: 50%;
    padding: 10vmin;
    position: fixed;
    text-align: center;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  h1 {
    font-family: monospace;
  }

  @keyframes slide {
    0% {
      transform: translateX(-25%);
    }
    100% {
      transform: translateX(25%);
    }
  }
`;

export const FormContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  form {
    height: fit-content;
    display: flex;
    flex-direction: column;
    min-width: 100%;
    .ant-form-item-explain-error,
    .ant-form-item-with-help .ant-form-item-explain {
      font-family: ${({ theme: { fonts } }) => fonts.primary};
      font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
    }
    .flex-dir-column {
      button {
        width: 100%;
      }
      /* .ant-btn {
        background: ${({ theme: { colors } }) =>
        `${colors.headingColor}!important`};
        border-color: ${({ theme: { colors } }) =>
        `${colors.headingColor}!important`};
      } */
      .ant-form-item-control-input-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        button {
          margin-bottom: 0.7rem;
        }
        span {
          font-family: ${({ theme: { fonts } }) => fonts.primary};
          font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
        }
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
      width: 90%;
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
          color: ${({ theme: { colors } }) => colors.pink};
          font-weight: 700;
        }
      }
    }
    .remove-section {
      display: flex;
      align-items: center;
      /* width: 20%; */
    }
  }
`;

export const SpanWrapper = styled.span`
  button {
    &:hover {
      background: rgba(255, 20, 147, 0.1);
      color: ${({ theme: { colors } }) => colors.pink};
    }
    &:active {
      background: rgba(255, 20, 147, 0.1);
      color: ${({ theme: { colors } }) => colors.pink};
    }
    &:visited {
      background: rgba(255, 20, 147, 0.1);
      color: ${({ theme: { colors } }) => colors.pink};
    }
    &:focus {
      color: ${({ theme: { colors } }) => colors.pink};
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
