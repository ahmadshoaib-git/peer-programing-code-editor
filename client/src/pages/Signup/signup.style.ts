import styled from "styled-components";

export const LoginWrapper = styled.div`
  min-height: 100v;
  min-width: 100%;
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
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
    /* display: flex;
    justify-content: center;
    align-items: center; */
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
    display: none;
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
  form {
    height: fit-content;
    display: flex;
    flex-direction: column;
    min-width: 16rem;
    .ant-form-item-explain-error,
    .ant-form-item-with-help .ant-form-item-explain {
      font-family: ${({ theme: { fonts } }) => fonts.primary};
      font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
    }
    .flex-dir-column {
      button {
        width: 100%;
      }
      .ant-btn {
        background: ${({ theme: { colors } }) =>
          `${colors.headingColor}!important`};
        border-color: ${({ theme: { colors } }) =>
          `${colors.headingColor}!important`};
      }
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
  font-family: ${({ theme: { fonts } }) => fonts.heading};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.headingTitle};
  font-weight: bold;
  color: ${({ theme: { colors } }) => colors.headingColor};
  margin: 0;
  padding: 0;
  cursor: pointer;
  margin-bottom: 0.7rem;
`;
