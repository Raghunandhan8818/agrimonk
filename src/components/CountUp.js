import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';

export default function CountUp({ end, suffix = '', duration = 1200 }) {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isInView || startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(progress * end));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
