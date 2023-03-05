import React, { useState } from 'react';
import Image from 'next/image';
import { keyframes, css } from '@emotion/react';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';

import cardAImg from '../public/imgs/switch-card-1.png';
import cardBImg from '../public/imgs/switch-card-2.png';

// cardA cardB 各有兩個動畫
const cardAUncovered = keyframes`
  0% {
    z-index: 0;
  }

  50% {
    transform: translate(-50%, -25%);
    z-index: 1;
  }

  100% {
    transform: translate(0%, 0%);
    z-index: 1;
  }
`;

const cardACovered = keyframes`
  0% {
    transform: scale(100%) translate(0%, 0%);
    z-index: 1;
  }

  50% {
    transform: scale(100%) translate(-25%, 0%) perspective(100px)
      rotateX(-2deg) rotateY(2deg);
    z-index: 0;
  }

  100% {
    z-index: 0;
  }
`;

const cardBUncovered = keyframes`
  0% {
    z-index: 0;
  }

  50% {
    transform:  translate(50%, 25%);

    z-index: 1;
  }

  100% {
    transform: scale(100%) translate(0%, 0%);
    z-index: 1;
  }
`;

const cardBCovered = keyframes`
  0% {
    transform: scale(100%) translate(0%, 0%);
    z-index: 1;
  }

  50% {
    transform: scale(100%) translate(25%, 0%) perspective(100px) rotateX(2deg)
      rotateY(-2deg);
    z-index: 0;
  }

  100% {
    z-index: 0;
  }
`;

const SwitchAnimation = (props) => css`
  animation: ${props.keyframe} 500ms;
  animation-duration: 500ms;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: 'running';
  animation-name: ${props.keyframe};
`;
const Container = styled.div`
  position: relative;
  height: 40vw;
  width: 90vw;
  margin: 0 auto;
  margin-top: 60px;
`;

const CardA = styled(Image, {
  shouldForwardProp: (prop) => isPropValid(prop),
})`
  position: absolute;
  object-fit: contain;
  width: 60vw;
  height: 35vw;
  top: 0;
  left: 0;
  z-index: ${(props) => (props.switchStatus === 'cardAUp' ? 1 : 0)};
  transition: transform 500ms;

  ${(props) => props.isPlaying && SwitchAnimation}
`;

const CardB = styled(Image, {
  shouldForwardProp: (prop) => isPropValid(prop),
})`
  position: absolute;
  object-fit: contain;
  width: 50vw;
  height: 25vw;
  bottom: 0;
  right: 0;
  z-index: ${(props) => (props.switchStatus === 'cardAUp' ? 0 : 1)};
  transition: transform 500ms;
  ${(props) => props.isPlaying && SwitchAnimation}
`;

function ShuffleCards() {
  const [switchStatus, setSwitchStatus] = useState('cardBUp');
  const [isPlaying, setIsPlaying] = useState(false);
  const animationSet =
    switchStatus === 'cardAUp'
      ? {
          cardA: cardAUncovered,
          cardB: cardBCovered,
        }
      : {
          cardA: cardACovered,
          cardB: cardBUncovered,
        };

  function handleSwitchCard() {
    if (switchStatus === 'cardAUp') {
      setSwitchStatus('cardBUp');
    } else {
      setSwitchStatus('cardAUp');
    }

    setIsPlaying((prev) => !prev);
  }
  return (
    <div>
      <Container>
        <CardA
          src={cardAImg}
          onClick={() => handleSwitchCard()}
          isPlaying={isPlaying}
          keyframe={animationSet.cardA}
          switchStatus={switchStatus}
          onAnimationEnd={() => setIsPlaying(false)}
        />
        <CardB
          src={cardBImg}
          isPlaying={isPlaying}
          onClick={() => handleSwitchCard()}
          keyframe={animationSet.cardB}
          switchStatus={switchStatus}
          onAnimationEnd={() => setIsPlaying(false)}
        />
      </Container>
    </div>
  );
}

export default ShuffleCards;
