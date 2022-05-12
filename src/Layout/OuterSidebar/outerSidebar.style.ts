import styled, { css } from "styled-components";

const CenteralizeStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  outline: 0;
  padding-right: 0.2rem;
`;

export const OuterSidebarWrapper = styled.div`
  ${CenteralizeStyles} /* min-height: 100vh; */
  height: 100%;
`;

export const OuterSidebarTop = styled.div`
  ${CenteralizeStyles}
  padding-top: 0.3rem;
  height: ${({ theme: { layout } }) => layout.header.height};
  button {
    color: ${({ theme: { colors } }) => colors.black};
  }
`;
export const OuterSidebarMiddle = styled.div`
  ${CenteralizeStyles}
  height: ${({ theme: { layout } }) => layout.main.height};
  button {
    margin-bottom: 0.2rem;
  }
`;
export const OuterSidebarFooter = styled.div`
  ${CenteralizeStyles}
  /* justify-content: flex-end; */
  /* height: ${({ theme: { layout } }) => layout.footer.height}; */
  height: auto;
  div,
  button {
    margin-bottom: 0.25rem;
  }
  button {
    color: ${({ theme: { colors } }) => colors.black};
  }
  div .ant-badge-dot {
    width: 0.5rem;
    height: 0.5rem;
    min-width: 0.5rem;
  }
  div .ant-avatar {
    background-color: rgba(255, 20, 147, 0.1);
    color: rgba(255, 20, 147, 1);
  }
`;
