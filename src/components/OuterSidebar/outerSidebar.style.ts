import styled, { css } from "styled-components";

const CenteralizeStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const OuterSidebarWrapper = styled.div`
  ${CenteralizeStyles} /* min-height: 100vh; */
  height: 100%;
`;

export const OuterSidebarTop = styled.div`
  ${CenteralizeStyles}
  height: ${({ theme: { layout } }) => layout.header.height};
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
  height: ${({ theme: { layout } }) => layout.footer.height};
`;
