import React from 'react';
import styled from 'styled-components';
import { LAYOUT_MAX_WIDTH, LAYOUT_MIN_WIDTH } from '../../config/variables';
import Card, { CardNameEnum } from '../../components/Card';

const StyledLuckyDraw = styled.div`
  min-width: ${LAYOUT_MIN_WIDTH}px;
  width: ${LAYOUT_MIN_WIDTH}px;
  max-width: ${LAYOUT_MAX_WIDTH}px;
  padding: 5px;
  box-sizing: border-box;

  .video-wrapper-fullversion {
    position: absolute;
    z-index: 1000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 10%;
    max-height: 100%;
    height: 100vh;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #008dff29;
  }

  .video-wrapper {
    width: 300px;
  }
  .shadow {
    opacity: 0.9;
    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
      rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      position: relative;
      top: 2px;
    }
  }
`;

function LuckyDraw() {
  return (
    <StyledLuckyDraw>
      <div
        className="shadow noselect"
        style={{
          cursor: 'pointer',
          width: 200,
          border: 'solid 1px',
          borderRadius: 5,
          padding: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>패시브</div>
        <div>카드뽑기</div>
      </div>
      <div>
        {/* <Card name={CardNameEnum.NIDALEE} /> */}
        {/* <Card name={CardNameEnum.NIDALEE_SONG_OF_THE_SEE} /> */}
      </div>
      <div className="video-wrapper">
        <video autoPlay style={{ maxWidth: '100%', maxHeight: '100%' }}>
          <source src="/resources/video/gatcha.mp4" type="video/mp4" />
        </video>
      </div>
    </StyledLuckyDraw>
  );
}
export default LuckyDraw;
