import React from "react";
import Tour from "./Tour";
const Tours = ({ tours }) => {
  return (
    <section>
      <div className="title">
        <h2>our tours</h2>
        <div className="underline"></div>
      </div>
      <div>
        {tours.map((tours) => {
          return <Tour key={tours.id} tour={tours}></Tour>;
        })}
      </div>
    </section>
  );
};

export default Tours;
