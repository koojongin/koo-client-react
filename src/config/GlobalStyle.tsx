import { createGlobalStyle, css, keyframes } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {
  ITEM_MAGIC_COLOR,
  ITEM_NORMAL_COLOR,
  ITEM_RARE_COLOR,
  MAIN_COLOR,
} from './variables';

const animation = keyframes`
    from {
        text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 3px #e60073, 0 0 4px #e60073, 0 0 5px #e60073, 0 0 6px #e60073, 0 0 7px #e60073;
    }
    to {
        text-shadow: 0 0 2px #fff, 0 0 3px #ff4da6, 0 0 4px #ff4da6, 0 0 5px #ff4da6, 0 0 6px #ff4da6, 0 0 7px #ff4da6, 0 0 8px #ff4da6;
    }
`;

const TippyCustomStyle = css`
  .tippy-box {
    max-width: inherit !important;
    &.no-padding .tippy-content {
      padding: 0;
    }
    &.no-border-radius {
      border-radius: 0;
    }
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
    ${TippyCustomStyle}
    *, body {
        font-family: 'Nexon';
    }
    body{
      margin:0;
      min-width: min-content;
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
    
    .item-color-normal{
      color:${ITEM_NORMAL_COLOR};
    }
    .item-color-magic{
      color:${ITEM_MAGIC_COLOR};
    }
    .item-color-rare{
      color:${ITEM_RARE_COLOR};
    }

    .hide,
    .fixed-hide {
      display: none;
    }

    .noselect {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
`;

export default GlobalStyle;
