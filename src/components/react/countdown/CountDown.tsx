import { useState, useEffect } from "react";

const helperTimer = (totalTime: number) => {
  const minutes = Math.floor(totalTime / 60);
  const second = totalTime % 60;
  return `${String(minutes).padStart(2, "0")}:${String(second).padStart(
    2,
    "0"
  )}`;
};

//Main Component
const CountDown = () => {
  const [counter, setCounter] = useState(119);

  //Side-Effect
  useEffect(() => {
    if (counter === 0) return;
    const timer = setTimeout(() => {
      setCounter((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [counter]);
  return (
    <>
      <h4>Count down timer</h4>
      <h6>{helperTimer(counter)}</h6>
    </>
  );
};

export default CountDown;
