import { useState, useEffect, useRef } from "react";

//helper function
const helperTimer = (timerValue: number) => {
  const minutes = Math.floor(timerValue / 60);
  const second = timerValue % 60;

  return `${String(minutes).padStart(2, "0")} : ${String(second).padStart(
    2,
    "0"
  )}`;
};

//Main component
const Timer = () => {
  const [timerCounter, setTimerCounter] = useState<number>(0);
  const [timeFlag, setTimeFlag] = useState(false);
  const timerRef = useRef(0);

  //Side Effect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (timeFlag) setTimerCounter((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [timeFlag]);

  //handler
  const timerHandler = (key: string) => {
    switch (key) {
      case "start":
        setTimeFlag(true);
        break;
      case "pause":
        setTimeFlag(false);
        break;
      case "stop":
        setTimerCounter(0);
        setTimeFlag(false);
        break;
      default:
        console.warn(`Unknown key: ${key}`);
    }
  };

  return (
    <div>
      <span style={{ display: "block" }}>{helperTimer(timerCounter)}</span>
      <button onClick={() => timerHandler("start")}>Start</button>
      <button onClick={() => timerHandler("pause")}>Pause</button>
      <button onClick={() => timerHandler("stop")}>Stop</button>
    </div>
  );
};

export default Timer;
