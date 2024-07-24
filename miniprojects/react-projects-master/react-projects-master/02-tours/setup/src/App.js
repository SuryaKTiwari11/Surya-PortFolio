import React, { useState } from "react";
import Tours from "./Tours";
import data from "./data";

function App() {
  const [tours, setTours] = useState(data);
  return (
    <main>
      <Tours tours={tours} />
    </main>
  );
}

export default App;
