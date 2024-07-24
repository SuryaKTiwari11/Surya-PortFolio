import { useEffect, useState } from "react";

const CleanupFunction = () => {
  const [toggle, setToggle] = useState(false);
  const toggleButton = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <h2>cleanUp function</h2>
      <button className="btn" onClick={toggleButton}>
        click me
      </button>
      {toggle && <RandomFuction />}
    </div>
  );
};
const RandomFuction = () => {
  useEffect(() => {
    console.log("hmmm, this is interesting");
    const intID = setInterval(() => {
      console.log("hello from the interpol");
    }, 1000);
    return () => {
      clearInterval(intID);
      console.log("clean up");
    };
  }, []);

  return <h1>hello World</h1>;
};

export default CleanupFunction;
