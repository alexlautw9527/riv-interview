import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useScrollDirection from '../hooks/useScrollDirection';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  color: black;
  font-size: 40px;
  font-weight: 700;
  font-style: italic;
  transition: transform 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.isHidden &&
    css`
      transform: translateY(-100%);
    `}
`;

const HeaderOuterPadding = styled.div`
  padding-bottom: 100px;
`;

function Header() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const isScrollDown = useScrollDirection();

  useEffect(() => {
    const handleScroll = () => {
      // 捲軸往下捲動且>300px時, 隱藏 header
      if (isScrollDown && window.scrollY > 300) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHeaderVisible, isScrollDown]);

  return (
    <div>
      <HeaderOuterPadding>
        <HeaderWrapper isHidden={!isHeaderVisible}>Film Maker</HeaderWrapper>
      </HeaderOuterPadding>
    </div>
  );
}

export default Header;
