import { useEffect, useState } from "react";

const MultipleReturnsBasics = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setInterval(() => {
      //done fetching data
      setIsLoading(false);
    }, 3000);
  }, []);
  if (isLoading) {
    return <h2>isLoading...</h2>;
  }
  return <h2>Multiple Returns basic</h2>
};
export default MultipleReturnsBasics;
