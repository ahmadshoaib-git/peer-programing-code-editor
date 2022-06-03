import styled from "styled-components/macro";

export const StyledFile = styled.div`
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  font-weight: normal;
  padding-left: ${(p) => p.theme.indent}px;
`;

export const SelectedFileDot = styled.div`
  display: inline-block;
  /* margin-right: 0.3rem; */
  position: absolute;
  left: -10px;
  height: 0.4rem;
  width: 0.4rem;
  border-radius: 0.4rem;
  background: ${({ theme: { colors } }) => `${colors.headingColor}!important`};
  border-color: ${({ theme: { colors } }) =>
    `${colors.headingColor}!important`};
`;
