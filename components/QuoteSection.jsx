import React from 'react';
import styled from '@emotion/styled';

const QuoteWrapper = styled.div`
  height: 100vh;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-style: italic;
  font-weight: 700;
  font-size: 2rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    line-height: 1.5;
  }
`;

function QuoteSection({ children }) {
  return <QuoteWrapper>{children}</QuoteWrapper>;
}

export default QuoteSection;
