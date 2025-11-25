'use client';

import React, { useState, useEffect, useRef } from 'react';


type Datetime = string | Date;

interface CountdownTimerProps {
  targetDate: Datetime;
  onLoaded?: () => void;
}

const CountdownTimer = ({ targetDate, onLoaded }: CountdownTimerProps) => {
  const hasNotifiedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const distance = target - now;

    if (distance < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, expired: false };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    // Signal that countdown is mounted and running
    if (!hasNotifiedRef.current && onLoaded && containerRef.current) {
      // Wait for first render and ensure text is visible with numbers
      const timer = setTimeout(() => {
        if (containerRef.current && !hasNotifiedRef.current) {
          const hasText = containerRef.current.textContent && containerRef.current.textContent.trim().length > 0;
          // Verify countdown numbers are displayed (contains 'd', 'h', 'm', 's')
          const hasCountdownFormat = containerRef.current.textContent?.match(/\d+d\s+\d+h\s+\d+m\s+\d+s/);
          if (hasText && hasCountdownFormat) {
            hasNotifiedRef.current = true;
            onLoaded();
          }
        }
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [onLoaded]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timer);
  }, [targetDate]); // Re-run effect if targetDate changes

  if (timeRemaining.expired) {
    return <div>Countdown Expired!</div>;
  }

  return (
    <div 
      ref={containerRef}
      className="flex countdown-timer font-bold text-3xl w-screen h-screen justify-self-center justify-center items-center text-center align-items-center gap-4 md:text-5xl lg:text-7xl"
    >
      <span>{timeRemaining.days}d </span>
      <span>{timeRemaining.hours}h </span>
      <span>{timeRemaining.minutes}m </span>
      <span>{timeRemaining.seconds}s</span>
    </div>
  );
};

export default CountdownTimer;