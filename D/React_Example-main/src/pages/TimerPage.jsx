import React, { useState, useEffect } from "react";

export default function TimerPage() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  function handleStart() {
    setIsRunning(true);
  }
  function handleStop() {
    setIsRunning(false);
  }
  function handleReset() {
    setIsRunning(false);
    setTime(0);
  }
  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isRunning]);
  return (
    <div>
      <div>Timer:{time}</div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
