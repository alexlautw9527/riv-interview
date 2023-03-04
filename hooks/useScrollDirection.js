const { useEffect, useState } = require('react');

function useScrollDirection() {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isScrollDown, setIsScrollDown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollDown(window.scrollY > prevScrollY);
      setPrevScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  return isScrollDown;
}

export default useScrollDirection;
