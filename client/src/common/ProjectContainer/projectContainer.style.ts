import styled from "styled-components";

export const ProjectContainerWrapper = styled.div`
  width: 14rem;
  height: auto;
  box-shadow: rgb(52 141 214 / 10%) 2px 3px 10px 4px;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  .ant-avatar {
    height: 8rem;
    width: 100%;
    font-size: 2.5rem;
    font-weight: 400;
  }
`;
export const ProjectNameSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  div {
    color: ${({ theme: { colors } }) => colors.black};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.paragraph};
    font-family: ${({ theme: { fonts } }) => fonts.primary};
    font-weight: 600;
    display: flex;
    align-items: center;
    .project-svg {
      color: rgba(255, 20, 147, 1);
    }
    svg {
      font-size: ${({ theme: { fontSizes } }) => fontSizes.subHeading};
      cursor: pointer;
      &:hover {
        color: rgba(255, 20, 147, 1);
      }
    }
    div,
    span {
      margin-left: 0.4rem;
    }
  }
`;

export const InnerSection = styled.div`
  padding: 1rem;
`;
export const InfoBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
  span,
  div {
    font-size: 0.7rem;
    font-family: ${({ theme: { fonts } }) => fonts.primary};
  }
  .flex {
    display: flex;
    align-items: center;
    svg {
      font-size: 0.9rem;
    }
    span {
      margin-left: 0.5rem;
    }
  }
`;
