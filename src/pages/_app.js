function GlobalStyle() {
  return (
      <style global jsx>{`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style: none;
    }
    body {
      font-family: 'Open Sans', sans-serif;
    }
    /* App fit Height */ 
    html, body, #__next {
      min-height: 100vh;
      display: flex;
      flex: 1;
    }
    #__next {
      flex: 1;
    }
    #__next > * {
      flex: 1;
    }

    ::-webkit-scrollbar {
      width: 8px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #52667A;
      border-radius: 0.4rem;
    }

    strong {
     position: relative;
     bottom: 8px;
    }

    p {
      color: white;
      font-size: small
    }

    @media only screen and (min-width: 960px) {
      p {
        margin-right: -30%
      }
    }

    @media only screen and (min-width: 1365px) {
      p {
        margin-right: -35%
      }
    }

    /* ./App fit Height */ 

  `}</style>
  );
}

export default function CustomApp({ Component, pageProps }) {
  return (
      <>
          <GlobalStyle />
          <Component {...pageProps} />
      </>
  );
}
