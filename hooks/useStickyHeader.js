
import { useEffect, useRef, useState } from 'react';

const useStickyHeader = () => {
  const headerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const currentRef = headerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === currentRef) {
            setIsSticky(!entry.isIntersecting);
          }
        });
      },
      {
        threshold: [0],
        rootMargin: '-1px 0px 0px 0px'
      }
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
