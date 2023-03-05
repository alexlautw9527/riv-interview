import React, { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import useWindowSize from '../hooks/useWindowSize';

const VideoWrapper = styled.video`
  width: 100%;
`;

function Video({ src, entryRatio }) {
  const windowSize = useWindowSize();
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (windowSize.width > 768) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio >= entryRatio) {
              videoRef.current.play();
            } else {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
            setIsVisible(entry.isIntersecting);
          });
        },
        { threshold: entryRatio }
      );
      observer.observe(videoRef.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [entryRatio, windowSize.width]);

  useEffect(() => {
    if (!isVisible) {
      videoRef.current.currentTime = 0;
    }
  }, [isVisible]);

  return <VideoWrapper src={src} ref={videoRef} muted controls />;
}

export default Video;
