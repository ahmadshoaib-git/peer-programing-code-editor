import styled from "styled-components";
import { Button, Form } from "antd";

export const Container = styled.div`
  width: 100%;
  height: auto;
`;

export const DependencyList = styled.ul`
  overflow-y: auto;
  margin-bottom: 1rem;
  height: auto;
  width: 100%;
  max-height: 10rem;
  li {
    list-style-type: none;
    display: flex;
    align-items: center;
    .disabled {
      color: ${({ theme: { colors } }) => colors.grey}!important;
      cursor: no-drop;
      &:hover {
        svg {
          color: ${({ theme: { colors } }) => colors.grey}!important;
        }
      }
    }
    svg {
      font-size: ${({ theme: { fontSizes } }) => fontSizes.subHeading};
      margin-right: 0.4rem;
      cursor: pointer;
    }
    span {
      font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
    }
    &:hover {
      svg {
        color: ${({ theme: { colors } }) => colors.pink};
      }
    }
  }
`;

export const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  .ant-form-item-explain-error,
  .ant-form-item-with-help .ant-form-item-explain {
    font-family: ${({ theme: { fonts } }) => fonts.primary};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
  }
  .flex-dir-column {
    width: 100%;
    button {
      width: 100%;
    }
  }
`;

export const ErrorBar = styled.div`
  width: 100%;
  height: auto;
  min-height: 1rem;
  margin-bottom: 0.5rem;
  font-family: ${({ theme: { fonts } }) => fonts.primary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.formError};
  color: ${({ theme: { colors } }) => `${colors.pink}`};
`;

export const CustomButton = styled(Button)`
  width: 100%;
  height: 1.7rem;
  padding: 0;
  color: ${({ theme: { colors } }) => `${colors.green}`};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
  border-radius: 0.15rem;
  border: 1px solid ${({ theme: { colors } }) => `${colors.green}`};
  &:hover {
    border: 2px solid ${({ theme: { colors } }) => `${colors.green}`};
    color: ${({ theme: { colors } }) => `${colors.green}`};
  }
  &:focus {
    border: 2px solid ${({ theme: { colors } }) => `${colors.green}`};
    color: ${({ theme: { colors } }) => `${colors.green}`};
  }
`;
