import { useState } from "react";

const ShortCircuitOverview = () => {
  const [text, setText] = useState("");
  const [name, setName] = useState("surya");
  return (
    <div>
      <h2>falsy OR: {text || "hello world"}</h2>
    </div>
  );
};
export default ShortCircuitOverview;
