import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Notable');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

html {
  background-color: #fff;
}
  * {
    box-sizing: border-box;
  }
  ::-webkit-scrollbar {
    background: transparent;  /* Optional: just make scrollbar invisible */
    width: 0px;  /* Remove scrollbar space */
  }
  body {
    cursor: default;
    font: 100% Ubuntu,Verdana,sans-serif;
    font-size: 20px;
    margin: 0;
    /* text-overflow: ellipsis; */
    text-size-adjust: 100%;
    white-space: nowrap;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
    a {
    align-items: center;
    display: grid;
    justify-items: center;
    grid-auto-flow: column;
    text-decoration: none;
  }
  button {
    border: none;
    cursor: pointer;
    outline: none;
    margin: 0;
    padding: 0;
  }
  h1 {
    /* font-family: Ubuntu Mono,Consolas,Menlo,monospace; */
    font-weight: 400;
    margin:0;
    text-align: center;
    @supports (font-size: clamp(1.75rem, 3vw, 2.1rem)) {
      font-size: clamp(1.75rem, 3vw, 2.1rem);
    }
  /* fallback */
    font-size: min(max(1.75rem, 3vw), 2.1rem);
  }
  input{
    border: none;
    outline: none;
    font-family: inherit;
  }
  input:focus{
    outline: none;
  }
  p {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
