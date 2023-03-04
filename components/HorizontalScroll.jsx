import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

// 父容器, 新增高度給 scroll 捲動
const OuterPaddingContainer = styled.div(({ dynamicHeight }) => ({
  position: 'relative',
  width: '100%',
  height: `${dynamicHeight}px`,
}));

// 子容器, 使用 sticky 達成捲動後還保持在畫面的效果
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

  // 新增的高度為: 總長度 - 視窗寬度 + 物體高度 + 150px 緩衝
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
    // 距離父容器 top 多長, 就向左滑動多長
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
