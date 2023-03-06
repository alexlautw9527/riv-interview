import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import HorizontalScroll from './HorizontalScroll';

import {
  Slider1,
  Slider2,
  Slider3,
  Slider4,
  Slider5,
  Slider6,
} from '../data/slider-images';

const CardsContainer = styled.div`
  position: relative;
  height: 100%;
  padding: 0 0 0 150px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const Slider = styled(Image)`
  position: relative;
  height: 600px;
  width: 300px;
  object-fit: cover;
  margin-right: 75px;
`;

const ImageArr = [Slider1, Slider2, Slider3, Slider4, Slider5, Slider6];

function HorizontalScrollSection() {
  return (
    <HorizontalScroll>
      <CardsContainer>
        {ImageArr.map((img) => (
          <Slider
            src={img.src}
            key={img.src}
            priority
            width={300}
            height={600}
          />
        ))}
      </CardsContainer>
    </HorizontalScroll>
  );
}

export default HorizontalScrollSection;
