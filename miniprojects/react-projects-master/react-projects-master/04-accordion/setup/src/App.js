import React, { useState } from "react";
import data from "./data";
import SingleQuestion from "./Question";
function App() {
  const [questions, SingleQuestions] = useState(data);
  // const {id,title,info} =data;
  return (
    <main>
      <div className="cointainer">
        <h3>question and answers about log</h3>
        <section className="info">
          {questions.map((itr) => {
            return <SingleQuestion key={itr.id} {...questions} />;
          })}
        </section>
      </div>
    </main>
  );
}

export default App;
