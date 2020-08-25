import { createGlobalStyle, css } from "styled-components";

export const typography = {
  header: css`
    font-size: 16px;
    font-family: "SF UI Text SemiBold";
    color: rgba(0, 0, 0, 0.85);
  `,
};

export const colors = {
  primary: "#667ACD",
  warning: "#E89B80",
  info: "#B5D99C",
};

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    font-weight: normal;
  }
  div, span {
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
    background: #E4E9F1;
  }
  .header {
    ${typography.header};
  }

`;
