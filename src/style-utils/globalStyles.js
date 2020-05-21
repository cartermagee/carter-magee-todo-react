import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    cursor: default;
    font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  button {
    border: none;
    cursor: pointer;
    outline: none;
  }
  h1 {
    font-weight: 400;
    margin:0;
    text-align: center;
    font-size: 3rem;
  }
  input:focus{
    outline: none;
  }
  p {
    margin: 0;
    padding: 0;
    overflow: scroll;
  }
`;

export default GlobalStyle;
