import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Tippy from '@tippyjs/react';
import { ICard } from 'koo-common-lib';

export enum CardNameEnum {
  NIDALEE = 'nidalee',
  NIDALEE_SONG_OF_THE_SEE = 'nidalee.song-of-the-see',
  XAYAH = 'xayah',
  XAYAH_ARCANA = 'xayah.arcana',
  THRESH = 'thresh',
  TAHMKENCH = 'tahmkench',
  TAHMKENCH_ARCANA = 'tahmkench.arcana',
}
export type CardNameKind = typeof CardNameEnum;
const StyledCard = styled.span`
  position: relative;
  .card-box {
    border: 4px solid transparent;
    border-radius: 5px;
    background-origin: border-box;
    background-clip: content-box, border-box;

    &.tier-r {
      background-image: linear-gradient(90deg, #f5f5f5 0, #e1e1e1 60%, #aaa),
        linear-gradient(90deg, #dedede 0, #cacaca 60%, #969696);
      //background-image: linear-gradient(#502b00, #ff4e00),
      //  linear-gradient(to right, #7e3a00, #7d3a00, #a35c00);
    }

    &.tier-sr {
      background-image: linear-gradient(to right, #89a67b, #351717),
        linear-gradient(
          324deg,
          #f1c40f,
          #f1c40f,
          #f1c40f,
          rgb(251 255 70),
          #f1c40f,
          #ffda00
        );
      background-image: linear-gradient(90deg, #fff5b4 0, #ffcd68 60%, #ffb300),
        linear-gradient(90deg, #ffeb69 0, #ffbf3f 75%, #f80);
      //box-shadow: 0 0 2px 0px #65d3ffaa, 0 0 2px 0px #ffcdf3aa,
      //  0 0 2px 0px #fbfcb9be;
    }

    &.tier-ssr {
      background-image: linear-gradient(
          90deg,
          #e6ffb4 0,
          #b4f6ff 25%,
          #b4c7ff 50%,
          #d6b4ff 75%,
          #ffb4f3
        ),
        linear-gradient(
          90deg,
          #2784ffc2 0,
          #4dffe7 25%,
          #6392ff 50%,
          #cb63ff 75%,
          #ff78ff
        );
      box-shadow: 0 0 4px 0px #fff7cc1f, 0 0 4px 0px #ffa6044d,
        0 0 4px 0px #a6ff5f4d, 0 0 4px 0px #65ffe53d, 0 0 4px 0px #1cbeff69;
    }
  }
`;

interface CardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  card: ICard;
}
export default function Card({ card, style }: CardProps) {
  const { name, tier } = card;
  return (
    <StyledCard style={style}>
      <Tippy
        className="no-padding no-border-radius background-transparent"
        content={<img height={300} src={`/resources/card/${name}.png`} />}
        placement="right-start"
        trigger="click"
        arrow={false}
      >
        <>
          <div style={{ position: 'absolute', top: 0, left: 5, zIndex: 1 }}>
            <Image
              width="30"
              height="30"
              src={`/resources/card/grade/${tier}.png`}
            />
          </div>
          <div
            className={`card-box tier-${tier}`}
            style={{
              cursor: 'pointer',
              position: 'relative',
              width: 100,
              height: 150,
            }}
          >
            <Image
              alt={name.toString()}
              layout="fill"
              objectFit="cover"
              src={`/resources/card/${name}.card.png`}
            />
          </div>
        </>
      </Tippy>
    </StyledCard>
  );
}
