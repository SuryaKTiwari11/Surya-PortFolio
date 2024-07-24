import React from "react";

export default function Progress({ index, quesLength, points, pointSum,answer }) {
  return (
    <header className="progress">
      <progress max={quesLength} value={index+Number(answer!==null)} />
      <p>
        Question <strong>{index + 1}</strong>/{quesLength}
      </p>
      <p>
        <strong>
          {points}/{pointSum}
        </strong>
      </p>
    </header>
  );
}
