
import { useState, useEffect, useRef } from 'react';

export const useCountUp = (end: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const animate = (timestamp: number) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = timestamp;
    }

    const progress = timestamp - startTimeRef.current!;
    const percentage = Math.min(progress / duration, 1);
    const currentCount = Math.floor(end * percentage);

    setCount(currentCount);

    if (progress < duration) {
      frameRef.current = requestAnimationFrame(animate);
    } else {
        setCount(end);
    }
  };

  useEffect(() => {
    if (end > 0) {
      startTimeRef.current = null;
      frameRef.current = requestAnimationFrame(animate);
    } else {
      setCount(0);
    }
    
    return () => {
      if(frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current);
      }
    }
  }, [end, duration]);

  return count;
};
