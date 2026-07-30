import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';

const COUNT_UP_OPTIONS = { threshold: 0.3 };

export default function CountUp({ end, suffix = '', duration = 1200 }) {
  const { ref, isInView } = useInView(COUNT_UP_OPTIONS);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isInView || startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();
    let cancelled = false;
    let rafHandle;

    function tick(now) {
      if (cancelled) return;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(progress * end));
      if (progress < 1) {
        rafHandle = requestAnimationFrame(tick);
      }
    }

    rafHandle = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafHandle);
    };
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
