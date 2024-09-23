"use client";
import React, { useState, useEffect } from 'react';
import "../css/Timer.css"

export default function Timer() {
  const [remainingSeconds, setRemainingSeconds] = useState(100000);
  const [time, setTime] = useState({
    days: 0,
    hours: 0, 
    minutes: 0, 
    seconds: 0
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 0) {
          clearInterval(intervalId); 
          return 0;
        }

        const timeLeft = prev - 1;

        const days = Math.floor(timeLeft / (60 * 60 * 24));
        const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
        const seconds = Math.floor(timeLeft % 60);

        setTime({
          days,
          hours,
          minutes,
          seconds
        });

        return timeLeft;
      });
    }, 1000);

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className="timer">
      <h4>See You There</h4>
      <div className="timerBlocks">
        <div className="daysBlock timerblock">
          <span className="timerBlockValue">{time.days}</span>
          <span>DAYS</span>
        </div>
        <div className="circle_between_timer_blocks"></div>
        <div className="hoursBlock timerblock">
          <span className="timerBlockValue">{time.hours}</span>
          <span>HOURS</span>
        </div>
        <div className="circle_between_timer_blocks"></div>
        <div className="minutesBlock timerblock">
          <div className="timerBlockValue">{time.minutes}</div>
          <span>MINUTES</span>
        </div>
        <div className="circle_between_timer_blocks"></div>
        <div className="secondsBlock timerblock">
          <span className="timerBlockValue">{time.seconds}</span>
          <span>SECONDS</span>
        </div>
      </div>
    </div>
  );
}
