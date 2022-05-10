import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        font-family: 'Open Sans', sans-serif; 
    }
    body {
        min-height:100vh;
    }
    #root{
        min-height:100vh;
        margin:0 auto;
    }
    :root {
    @-moz-document url-prefix() {
      scrollbar-color: #71717a #F5F5F5 !important; (track, thumb);
    }
  }

  ::-webkit-scrollbar {
    width: 0.3rem;
    height: 0.375rem;
    background-color: #F5F5F5;
    border-radius: 3.125rem;
  }

  ::-webkit-scrollbar-corner {
    background-color: #71717a;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgb(158, 153, 153) !important;
    border-radius: 3.125rem;
  }

  ::-webkit-scrollbar-track {
    background-color: #eaecec !important;
    border-radius: 3.125rem;
  }
  .ant-tooltip-inner {
    font-size: 0.7rem;
    max-height: 1.5rem;
    min-height: 1.5rem;
    border-radius: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
 `;

export default GlobalStyle;
