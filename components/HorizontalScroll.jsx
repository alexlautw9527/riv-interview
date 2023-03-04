import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const OuterPaddingContainer = styled.div(({ dynamicHeight }) => ({
  position: 'relative',
  width: '100%',
  height: `${dynamicHeight}px`,
}));

const StickyInnerContainer = styled.div`
  position: sticky;
  top: 0px;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const HorizontalTranslateContainer = styled.div(({ translateX }) => ({
  position: 'absolute',
  height: '100%',
  willChange: 'transform',
  transform: `translateX(${translateX}px)`,
}));

const calcDynamicHeight = (objectWidth, objectHeight) => {
  const vw = window.innerWidth;
  return objectWidth - vw + objectHeight + 150;
};

const handleDynamicHeight = (ref, setDynamicHeight) => {
  const objectWidth = ref.current.scrollWidth;
  const objectHeight = ref.current.scrollHeight;
  const dynamicHeight = calcDynamicHeight(objectWidth, objectHeight);
  setDynamicHeight(dynamicHeight);
};

const applyScrollListener = (ref, setTranslateX) => {
  window.addEventListener('scroll', () => {
    const offsetTop = -ref.current.offsetTop;
    setTranslateX(offsetTop);
  });
};

export default function HorizontalScroll({ children }) {
  const [dynamicHeight, setDynamicHeight] = useState(null);
  const [translateX, setTranslateX] = useState(0);

  const containerRef = useRef(null);
  const objectRef = useRef(null);

  const resizeHandler = () => {
    handleDynamicHeight(objectRef, setDynamicHeight);
  };

  useEffect(() => {
    handleDynamicHeight(objectRef, setDynamicHeight);
    window.addEventListener('resize', resizeHandler);
    applyScrollListener(containerRef, setTranslateX);
  }, []);

  return (
    <OuterPaddingContainer dynamicHeight={dynamicHeight}>
      <StickyInnerContainer ref={containerRef}>
        <HorizontalTranslateContainer translateX={translateX} ref={objectRef}>
          {children}
        </HorizontalTranslateContainer>
      </StickyInnerContainer>
    </OuterPaddingContainer>
  );
}
