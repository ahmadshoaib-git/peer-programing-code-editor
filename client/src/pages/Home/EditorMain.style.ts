import styled from "styled-components";

export const MainWrapper = styled.div`
  min-height: 100v;
  min-width: 100%;
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
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
