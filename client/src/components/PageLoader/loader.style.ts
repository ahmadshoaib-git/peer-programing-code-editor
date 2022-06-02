import styled from "styled-components";
import { Spin } from "antd";

export const CustomSpin = styled(Spin)`
  .ant-spin-dot {
    width: 2.4rem;
    height: 2.4rem;
  }
  .ant-spin-dot-item {
    background-color: rgba(255, 20, 147, 1);
    width: 1.1rem;
    height: 1.1rem;
  }
`;
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
