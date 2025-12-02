import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    font-size : 10px;
	font-family: 'Noto Sans', sans-serif;
	color: ${({ theme }) => theme.color};
  }

  @media (min-width: 600px) { :root { font-size: 12px; } }
  @media (min-width: 768px) { :root { font-size: 14px; } }
  @media (min-width: 1024px) { :root { font-size: 16px; } }

  html, body, #root {
    height: 100%;
    width: 100%;
	scrollbar-gutter: stable;
  }

  *, *::before, *::after {
	margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.themeColor};
    font-size: 1rem;
	font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 400;
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.1rem; }
  h5 { font-size: 1rem; }
  h6 { font-size: 1rem; }

  span {
    line-height: 1;
  }

  input, button {
    border: 0px;
  }

  button {
    cursor: pointer;
  }

  textarea, button, select {
    font-family: inherit;
    font-size: 1rem; 
    color: ${({ theme }) => theme.color};
  }

  input, option, ul, ol, a{
    font-family: inherit;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.color};
  }

  ul, ol {
	list-style-position: inside;
	font-size: 0.8rem;
  }

  a {
	text-decoration: none;
  }

  svg {
	color: ${(theme) => theme.color};

	& * {
    	fill: currentColor;
  	}
  }
`;
