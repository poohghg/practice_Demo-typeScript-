import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

   body {
     margin: 0;
     font-family: 'Noto Sans KR';
   }

  a,a:hover { 
    text-decoration:none; 
    color: #1B1D2A;
  }

  ul {
    list-style:none ;
  }
  p {
    font-size:1rem ;
    color:#1B1D2A;
  }
  span {
    font-size:0.8rem ;
    color:#1B1D2A;
  }
  button {
    border-style: none;
    border: none;
    background: none;
    font-family: 'Noto Sans KR';
  }

  h1{}
  h2{font-size:2.2rem;font-weight:700}


 /* 반응형 */
   @media only screen and (max-width: 844px) {
     html {
       font-size: 13px;
     }
   }

  /* 폰트 */
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 100;
    src: url('../asset/fonts/NotoSansKR-Thin.woff2') format('woff2'),
      url('../asset/fonts/NotoSansKR-Thin.woff') format('woff'),
      url('../asset/fonts/NotoSansKR-Thin.otf') format('opentype');
    font-display: block;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 300;
    src: url('../asset/fonts/NotoSansKR-Light.woff2') format('woff2'),
      url('../asset/fonts/NotoSansKR-Light.woff') format('woff'),
      url('../asset/fonts/NotoSansKR-Light.otf') format('opentype');
    font-display: block;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    src: url('../asset/fonts/NotoSansKR-Regular.woff2') format('woff2'),
      url('../asset/fonts/NotoSansKR-Regular.woff') format('woff'),
      url('../asset/fonts/NotoSansKR-Regular.otf') format('opentype');
    font-display: block;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    src: url('./asset/fonts/NotoSansKR-Medium.woff2') format('woff2'),
      url('../asset/fonts/NotoSansKR-Medium.woff') format('woff'),
      url('../asset/fonts/NotoSansKR-Medium.otf') format('opentype');
    font-display: block;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    src: url('../asset/fonts/NotoSansKR-Bold.woff2') format('woff2'),
      url('../asset/fonts/NotoSansKR-Bold.woff') format('woff'),
      url('../asset/fonts/NotoSansKR-Bold.otf') format('opentype');
    font-display: block;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 900;
    src: url('../asset/fonts/NotoSansKR-Black.woff2') format('woff2'),
      url('../asset/fonts/NotoSansKR-Black.woff') format('woff'),
      url('../asset/fonts/NotoSansKR-Black.otf') format('opentype');
    font-display: block;
  }

`;

export default GlobalStyle;
