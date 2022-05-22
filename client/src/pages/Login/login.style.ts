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
`;

export const LoginRightContainer = styled.div`
  min-height: 100vh;
  min-width: 50%;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
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
  }
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
