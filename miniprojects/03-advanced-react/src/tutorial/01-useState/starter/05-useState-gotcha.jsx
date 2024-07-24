import { useState } from "react";
const UseStateGotcha = () => {
  const [count, setCount] = useState(0);

  const IncreaseValue = () => {
    setTimeout(() => {
      console.log("click em");
      setCount((currentState) => {
        return currentState + 1;
      });
    },3000);
  };
  return (
    <div>
      <h2>{count}</h2>
      <button className="btn" type="button" onClick={IncreaseValue}>
        CLICK ME
      </button>
    </div>
  );
};

export default UseStateGotcha;
