import { useState } from "react";
const UseStateBasics = () => {
  const [count, setCount] = useState(0); 
  //they have deconstructed a array here
  //the first variable is from storing the value and the second is for updating the value
  const handleClick = () => {
    setCount(count+1);
  };
  return (
    <div>
      <h4>you clicked {count} times</h4>
      <button className="btn" type="button" onClick={handleClick}>
        Button
      </button>
      <h2>useState basics</h2>
    </div>
  );
};

export default UseStateBasics;
