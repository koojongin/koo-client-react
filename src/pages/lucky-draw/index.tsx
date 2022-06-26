import React, { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
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
    margin: auto;
    width: 80vw;
    height: 80vh;
    //max-height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    background: #008dff29;
    video {
      max-height: inherit !important;
    }
  }

  .video-wrapper {
    width: 700px;
    position: relative;
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
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const [isEndedVideo, setIsEndedVideo] = useState<boolean>(false);
  const [isWaitingDraw, setIsWaitingDraw] = useState<boolean>(false);
  const [dropList, setDropList] = useState<any[]>([]);

  const onClickDrawButton = () => {
    videoElementRef?.current?.play();
    setIsWaitingDraw(true);
  };

  const getRandomCard = () => {
    const cardNames = Object.values(CardNameEnum);
    const tiers = ['r', 'sr', 'ssr'];
    const [randomTier] = _.shuffle(tiers);
    const [randomCardName] = _.shuffle(cardNames);
    return {
      name: randomCardName,
      tier: randomTier,
    };
  };
  const onEndedDrawVideo = () => {
    getRandomCard();
    setIsEndedVideo(true);
    setIsWaitingDraw(false);
    setDropList(origin => {
      return [...origin, ...[getRandomCard()]];
    });
    console.log(dropList);
  };

  const onTimeUpdate = (event: BaseSyntheticEvent) => {
    const { target } = event;
    const { currentTime } = target;
    const DRAW_VIDEO_END_TIMESTAMP = 6.18;
    if (currentTime >= DRAW_VIDEO_END_TIMESTAMP) {
      setIsEndedVideo(true);
    } else {
      setIsEndedVideo(false);
    }
  };

  const onClickSkipButton = () => {
    if (!videoElementRef.current) return;
    videoElementRef.current.currentTime = 999;
  };
  useEffect(() => {
    if (!videoElementRef.current) return;
    const { current } = videoElementRef;
    current.volume = 0.5;
  }, [videoElementRef]);

  useEffect(() => {
    if (!isEndedVideo) return;

    console.log(isWaitingDraw, 'video end');
  }, [isEndedVideo]);
  return (
    <StyledLuckyDraw>
      <div
        tabIndex={0}
        role="button"
        onClick={onClickDrawButton}
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
      <div className={`video-wrapper ${isWaitingDraw ? '' : 'hide'}`}>
        <video
          onTimeUpdate={onTimeUpdate}
          onEnded={onEndedDrawVideo}
          ref={videoElementRef}
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        >
          <source src="/resources/video/gatcha.mp4" type="video/mp4" />
        </video>
        <div
          tabIndex={0}
          role="button"
          onClick={onClickSkipButton}
          className={isEndedVideo ? 'hide' : ''}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            margin: '10px 5px',
          }}
        >
          <div
            className="shadow noselect"
            style={{
              position: 'relative',
              minWidth: 80,
              padding: '1px 0',
              textAlign: 'center',
              cursor: 'pointer',
              border: 'solid 1px',
              borderRadius: 5,
              background: 'rgba(255,255,255,0.9)',
            }}
          >
            Skip
          </div>
        </div>
      </div>

      <div className={`${!isWaitingDraw ? '' : 'hide'}`}>
        <div>드랍 목록</div>
        <div style={{ display: 'inline-flex', flexFlow: 'wrap' }}>
          {dropList.map((card, index) => {
            return (
              <Card
                style={{ marginRight: 5, marginBottom: 5 }}
                key={`dropped-card-${index + 0}-${card.name}`}
                card={card}
              />
            );
          })}
        </div>
      </div>
    </StyledLuckyDraw>
  );
}
export default LuckyDraw;
