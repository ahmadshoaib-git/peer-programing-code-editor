import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const OuterSideBarWrapper = styled.div`
  width: ${({ theme: { layout } }) => layout.outerSideBar.width};
  height: ${({ theme: { layout } }) => layout.outerSideBar.height};
`;

export const InnerLayoutWrapper = styled.div`
  border: 1px solid ${({ theme: { colors } }) => colors.borderWhite};
  width: ${({ theme: { layout } }) => layout.innerLayout.width};
  height: ${({ theme: { layout } }) => layout.innerLayout.height};
`;
