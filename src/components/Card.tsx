import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Tippy from '@tippyjs/react';

export enum CardNameEnum {
  NIDALEE = 'nidalee',
  NIDALEE_SONG_OF_THE_SEE = 'nidalee.song-of-the-see',
}
type CardNameKind = CardNameEnum;
const StyledCard = styled.span`
  .card-box {
    border: 4px solid transparent;
    border-radius: 5px;
    background-image: linear-gradient(#444444, #444444),
      linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
`;
export default function Card({ name }: { name: CardNameKind }) {
  return (
    <StyledCard>
      <Tippy
        className="no-padding no-border-radius"
        content={<img height={300} src={`/resources/card/${name}.png`} />}
        placement="right-start"
        arrow={false}
      >
        <div
          className="card-box"
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
