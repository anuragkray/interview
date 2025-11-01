import { useState, useCallback, memo, useEffect } from 'react';

// Define props interface for Child component
interface ChildProps {
    onClick: () => void;
}

// Memoized Child component that accepts onClick prop
const Child = memo(({ onClick }: ChildProps) => {
    console.log('Child component rendered');
    return (
        <button onClick={onClick}>Increment Counter</button>
    );
});

export default function UseCallbackExample() {
    const [counter, setCounter] = useState(0);
    const [text, setText] = useState('');

    // Using useCallback to memoize the function
    const handleIncrementButton = useCallback(() => {
        setCounter((prev) => prev + 1);
    }, []);
    console.log("Parent component rendering");
    return (
        <>
            <h3>{`This is the Counter : ${counter}`}</h3>
            <input onChange={(event) => setText(event.target.value)} />
            <Child onClick={handleIncrementButton} />
        </>
    );
}
// Second Methods
const Child_1 = memo(({ tick }) => {
  console.log("child is rendering");
  return <></>;
});

 function App() {
  const [counter, setCounter] = useState(0);

  const tick = useCallback(() => {
    setCounter((prevCount) => prevCount + 1);
  }, []);

  useEffect(() => {
    console.log("USEEFFECT");
    const interval = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  return (
    <div className="App">
      <h1>{counter}</h1>
      <Child_1 tick={tick} />
    </div>
  );
}
