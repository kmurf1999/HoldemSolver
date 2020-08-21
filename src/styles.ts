import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    font-weight: normal;
  }
  html, body, #root {
    height: 100%;
    background: #E4E9F1;
  }
`;

export const colors = {
  primary: "#667ACD",
  warning: "#E89B80",
  info: "#B8EBD0",
};
