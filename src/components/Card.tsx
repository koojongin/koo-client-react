import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Tippy from '@tippyjs/react';

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
  .card-box {
    border: 4px solid transparent;
    border-radius: 5px;
    background-origin: border-box;
    background-clip: content-box, border-box;

    &.tier-rare {
      background-image: linear-gradient(#502b00, #ff4e00),
        linear-gradient(to right, #7e3a00, #7d3a00, #a35c00);
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
      //box-shadow: 0 0 2px 0px #65d3ffaa, 0 0 2px 0px #ffcdf3aa,
      //  0 0 2px 0px #fbfcb9be;
    }

    &.tier-ssr {
      background-image: linear-gradient(#ffffff, #ffffff),
        linear-gradient(
          137deg,
          #ff8b88,
          #2a51ff,
          #ffa604aa,
          #71ff00aa,
          #65ffe5aa,
          #1cbeffaa
        );
      box-shadow: 0 0 4px 0px #ff8b88, 0 0 4px 0px #ffa604aa,
        0 0 4px 0px #a6ff5faa, 0 0 4px 0px #65ffe5aa, 0 0 4px 0px #1cbeffaa;
    }
  }
`;

export interface ICard {
  name: CardNameKind | string;
  tier: string;
}

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
        className="no-padding no-border-radius"
        content={<img height={300} src={`/resources/card/${name}.png`} />}
        placement="right-start"
        arrow={false}
      >
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
            alt={name}
            layout="fill"
            objectFit="cover"
            src={`/resources/card/${name}.card.png`}
          />
        </div>
      </Tippy>
    </StyledCard>
  );
}
