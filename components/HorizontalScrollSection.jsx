import React from 'react';
import styled from '@emotion/styled';
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

const Slider = styled.div`
  position: relative;
  height: 600px;
  width: 300px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${(props) => `url(${props.imgSrc})`};
  margin-right: 75px;
  flex-shrink: 0;
`;

const ImageArr = [Slider1, Slider2, Slider3, Slider4, Slider5, Slider6];

export default function HorizontalScrollSection() {
  console.log(ImageArr);
  return (
    <HorizontalScroll>
      <CardsContainer>
        {ImageArr.map((img) => (
          // eslint-disable-next-line react/jsx-key
          <Slider imgSrc={img.src} />
        ))}
      </CardsContainer>
    </HorizontalScroll>
  );
}
