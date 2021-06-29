import { createGlobalStyle } from 'styled-components'

const width = `${window.innerWidth}px`
const height = `${window.innerHeight}px`

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    min-width: ${width};
    min-height: ${height};
    height: 100%;
    // font-family: 'Cabin', sans-serif;
    font-family: "Roboto", sans-serif;

    padding-bottom: 1rem;
  }
`
