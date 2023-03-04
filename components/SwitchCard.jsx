import React, { useState } from 'react';
import Image from 'next/image';
import { keyframes, css } from '@emotion/react';
import styled from '@emotion/styled';

import cardAImg from '../public/imgs/switch-card-1.png';
import cardBImg from '../public/imgs/switch-card-2.png';

const cardAUncovered = keyframes`
  0% {
    /* transform: scale(70%) ; */
    z-index: 0;
  }

  50% {
    /* transform: scale(70%) translate(-50%, -25%); */
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
    /* transform: scale(70%); */
    z-index: 0;
  }
`;

const cardBUncovered = keyframes`
  0% {
    /* transform: scale(70%) ; */
    z-index: 0;
  }

  50% {
    /* transform: scale(70%) translate(50%, 25%); */
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
    /* transform: scale(70%); */
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
const SectionContainer = styled.div`
  position: relative;
  height: 40vw;
  width: 90vw;
  margin: 0 auto;
`;

const CardA = styled(Image)`
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

// transform: ${(props) =>
//   props.switchStatus === 'cardAUp' ? 'scale(100%) ' : 'scale(70%)'};

const CardB = styled(Image)`
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

// transform: ${(props) =>
//   props.switchStatus === 'cardAUp' ? 'scale(70%) ' : 'scale(100%)'};

function SwitchCard() {
  const [switchStatus, setSwitchStatus] = useState('cardAUp');
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
      <SectionContainer>
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
      </SectionContainer>
    </div>
  );
}

export default SwitchCard;
