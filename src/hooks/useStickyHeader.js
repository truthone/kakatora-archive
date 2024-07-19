import { useEffect, useRef, useState } from 'react';

const useStickyHeader = () => {
  const headerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const currentRef = headerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsSticky(!entry.isIntersecting);
        });
      },
      { threshold: [0, 1] }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [headerRef]);

  return [headerRef, isSticky];
};

export default useStickyHeader;
