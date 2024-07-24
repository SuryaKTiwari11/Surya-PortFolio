import { data } from "../../../data";
import { useState } from "react";
// import React from "react";
const UseStateArray = () => {
  const [people, setPeople] = useState(data);
  const removeItems = (id) => {
    const newPeople = people.filter((person) => person.id !== id);
    setPeople(newPeople);
  };
  const clearAllItems = () => {
    setPeople([]);
  };
  return (
    <div>
      {people.map((person) => {
        const { id, name } = person;
        return (
          <div key={id}>
            <h1>{name}</h1>
            <button
              type="button"
              className="btn"
              onClick={() => removeItems(id)}
            >
              remove
            </button>
          </div>
        );
      })}
      <button type="button" className="btn" onClick={clearAllItems}>
        ClearItems
      </button>
    </div>
  );
};

export default UseStateArray;
