import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    font-size : 14px;
    font-family: 'Noto Sans', sans-serif;
    color: ${({ theme }) => theme.font};
  }

  @media (min-width: 375px) { :root { font-size: 14px; } }
  @media (min-width: 414px) { :root { font-size: 16px; } }
  @media (min-width: 768px) { :root { font-size: 18px; } }
  @media (min-width: 1024px) { :root { font-size: 20px; } }
  @media (min-width: 1280px) { :root { font-size: 22px; } }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html, body, #root {
    height: 100vh;
    width: 100%;
    /* scrollbar-gutter: stable; */
  }

  body {
    background-color: ${({ theme }) => theme.theme};
    font-size: 1rem;
    font-weight: 400;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 { font-weight: 400; }
  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.1rem; }
  h5, h6 { font-size: 1rem; }

  span { line-height: 1; }

  input, button { border: 0; }
  button { cursor: pointer; background: none; }

  textarea, button, select, input, option, ul, ol, a {
    font-family: inherit;
    font-size: 1rem; 
    color: ${({ theme }) => theme.font};
  }

  ul, ol {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  /* ICON */
  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: ${({ theme }) => theme.sub};

    & * {
      fill: currentColor;
    }
  }
`;
