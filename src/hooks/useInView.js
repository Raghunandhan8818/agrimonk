import { useCallback, useRef, useState } from 'react';

export function useInView(options) {
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef(null);

  const ref = useCallback(
    (node) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node) return;

      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current.disconnect();
        }
      }, options);

      observerRef.current.observe(node);
    },
    [options]
  );

  return { ref, isInView };
}
