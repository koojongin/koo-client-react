import { createGlobalStyle, css, keyframes } from 'styled-components';
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer } from 'react-toastify';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faFontAwesome, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Head from 'next/head';
import Script from 'next/script';
import { MAIN_COLOR } from './variables';

library.add(fas, faTwitter, faFontAwesome);

const animation = keyframes`
    from {
        text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 3px #e60073, 0 0 4px #e60073, 0 0 5px #e60073, 0 0 6px #e60073, 0 0 7px #e60073;
    }
    to {
        text-shadow: 0 0 2px #fff, 0 0 3px #ff4da6, 0 0 4px #ff4da6, 0 0 5px #ff4da6, 0 0 6px #ff4da6, 0 0 7px #ff4da6, 0 0 8px #ff4da6;
    }
`;
const ToastCustomStyle = css`
  .Toastify__toast {
    min-height: 0px !important;
    &.itemdrop {
      background: ${MAIN_COLOR};
      color: white;
      padding: 12px 20px;
      box-shadow: 0 3px 6px -1px rgba(0, 0, 0, 0.12),
        0 10px 36px -4px rgba(77, 96, 232, 0.3);
      background: -webkit-linear-gradient(315deg, #73a5ff, #5477f5);
      background: linear-gradient(135deg, #73a5ff, #5477f5);
      transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
      border-radius: 2px;
      cursor: pointer;
      text-decoration: none;
    }
  }
`;

const GlobalStyle = createGlobalStyle`
    ${ToastCustomStyle}
    *, body {
        font-family: 'Nexon';
    }
    
    hr{
      border-top: none;
      border-right: none;
      border-left: none;
      border-color: black;
    }
    
    .glow {
        color: #fff;
        -webkit-animation: glow 1s ease-in-out infinite alternate;
        -moz-animation: glow 1s ease-in-out infinite alternate;
        animation: ${animation} 1s ease-in-out infinite alternate;
    }
    
    .item-action-card-tippy{
      .tippy-content{
        padding:0;
      }
    }
    
`;

export default function GlobalSetting() {
  return (
    <>
      <Head>
        <meta property="og:title" content="KOO ONLINE" />
        <meta property="og:description" content="그냥 취미로 만드는 웹 게임" />
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/attachments/747691288890966057/752764267580620881/discord.png"
        />

        <title>KOO ONLINE</title>
      </Head>
      <Script src="https://kit.fontawesome.com/480ca21863.js" />
      <Helmet>
        <style>@import url(http://jiku90.com/fonts/font.css);</style>
      </Helmet>
      <GlobalStyle />
      <ToastContainer
        className="black-background"
        bodyClassName="grow-font-size"
        progressClassName="fancy-progress-bar"
      />
    </>
  );
}
