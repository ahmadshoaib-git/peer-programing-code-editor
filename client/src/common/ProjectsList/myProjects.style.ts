import styled, { css } from "styled-components";
import { Empty } from "antd";

const CenteralizeStyles = css`
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
`;

export const MyProjectsWrapper = styled.div`
  ${CenteralizeStyles}
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 2rem;
`;

export const EmptyProjectWrapper = styled.div`
  ${CenteralizeStyles}
  align-items: center;
  justify-content: center;
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
