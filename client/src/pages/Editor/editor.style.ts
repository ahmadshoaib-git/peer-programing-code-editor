import styled, { css } from "styled-components";

export const EditorHeaderSection = styled.div`
  background: ${({ theme: { colors } }) => `${colors.headingColor}!important`};

  color: ${({ theme: { colors } }) => `${colors.white}!important`};

  border-color: ${({ theme: { colors } }) =>
    `${colors.headingColor}!important`};

  width: 100%;
  height: fit-content !important;
  padding: 0 1rem;
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${({ theme: { fonts } }) => fonts.primary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};

  .file-name-section {
    display: flex;
    align-items: center;
  }

  svg {
    cursor: pointer;
    font-size: 1.1rem;
  }
`;

export const EditorFooterSection = styled.div`
  background: ${({ theme: { colors } }) => `${colors.black}!important`};

  color: ${({ theme: { colors } }) => `${colors.white}!important`};

  border-color: ${({ theme: { colors } }) => `${colors.black}!important`};

  width: 100%;
  height: fit-content !important;
  padding: 0 1rem;
  z-index: 1;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${({ theme: { fonts } }) => fonts.primary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};

  svg {
    cursor: pointer;
    font-size: 1.1rem;
    /* color: ${({ theme: { colors } }) => `${colors.pink}!important`}; */
  }

  .clickable {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
    color: ${({ theme: { colors } }) => `${colors.white}`};
  }

  .play {
    color: ${({ theme: { colors } }) => `${colors.green}`};
  }
  .editor {
    color: ${({ theme: { colors } }) => `${colors.pink}`};
  }
  div div svg {
    margin-right: 5px;
  }

  div div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const FileLocked = styled.div`
  display: flex;
  padding-left: 0.3rem;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
  background: ${({ theme: { colors } }) => `${colors.headingColor}!important`};
  color: ${({ theme: { colors } }) => `${colors.white}!important`};
  position: relative;
  width: 28px;
  height: 100%;
`;

export const SpanWrapper = styled.span`
  position: absolute;
  z-index: 11;
  top: 5%;
  right: 20px;
  button {
    border: 2px solid;
    background: ${({ theme: { colors } }) =>
      `${colors.headingColor}!important`};
    color: ${({ theme: { colors } }) => `${colors.white}!important`};
    border-color: ${({ theme: { colors } }) =>
      `${colors.headingColor}!important`};
    &:hover {
      background: ${({ theme: { colors } }) => `${colors.white}!important`};
      color: ${({ theme: { colors } }) => `${colors.headingColor}!important`};
      border-color: ${({ theme: { colors } }) =>
        `${colors.headingColor}!important`};
    }
    &:active {
      background: ${({ theme: { colors } }) => `${colors.white}!important`};
      color: ${({ theme: { colors } }) => `${colors.headingColor}!important`};
      border-color: ${({ theme: { colors } }) =>
        `${colors.headingColor}!important`};
    }
    &:visited {
      background: ${({ theme: { colors } }) => `${colors.white}!important`};
      color: ${({ theme: { colors } }) => `${colors.headingColor}!important`};
      border-color: ${({ theme: { colors } }) =>
        `${colors.headingColor}!important`};
    }
    &:focus {
      background: ${({ theme: { colors } }) => `${colors.white}!important`};
      color: ${({ theme: { colors } }) => `${colors.headingColor}!important`};
      border-color: ${({ theme: { colors } }) =>
        `${colors.headingColor}!important`};
    }
  }
`;

export const SpanWrapperSave = styled.span`
  position: absolute;
  z-index: 11;
  top: 11%;
  right: 20px;
  button {
    border: 2px solid;
    border-color: ${({ theme: { colors } }) => colors.pink};
    color: ${({ theme: { colors } }) => colors.pink};
    background-color: ${({ theme: { colors } }) => `${colors.white}!important`};
    &:hover {
      background: rgba(255, 20, 147, 0.1) !important;
      color: ${({ theme: { colors } }) => `${colors.pink} !important`};
      border-color: ${({ theme: { colors } }) => `${colors.pink} !important`};
    }
    &:active {
      background: rgba(255, 20, 147, 0.1) !important;
      color: ${({ theme: { colors } }) => `${colors.pink} !important`};
      border-color: ${({ theme: { colors } }) => `${colors.pink} !important`};
    }
    &:visited {
      background: rgba(255, 20, 147, 0.1) !important;
      color: ${({ theme: { colors } }) => `${colors.pink} !important`};
      border-color: ${({ theme: { colors } }) => `${colors.pink} !important`};
    }
    &:focus {
      color: ${({ theme: { colors } }) => `${colors.pink} !important`};
      border-color: ${({ theme: { colors } }) => `${colors.pink} !important`};
    }
  }
`;
