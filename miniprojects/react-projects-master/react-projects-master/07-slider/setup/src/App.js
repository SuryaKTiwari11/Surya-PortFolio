import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => clearInterval(slider);
  }, [index]);
  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>review
        </h2>
      </div>
      <div className="section-center">
        {/* itr = is the i in the forloop and personIndex is the value of I */}
        {people.map((itr, personIndex) => {
          let position = "nextSlide";
          if (personIndex === index) {
            position = "activeSlide";
          }
          if (
            //edge case
            //important ig
            //agar mera i ki value , i - 1 hai then that becomes the last slide
            personIndex === index - 1 ||
            //agar mera i = 0 then my i ki value becomes size -1
            //ohhhh
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article className={position} key={itr.id}>
              <img src={itr.image} alt={itr.name} className="person-img" />
              <h4>{itr.name}</h4>
              <p className="title">{itr.title}</p>
              <p className="text">{itr.quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button
          className="prev"
          onClick={() => {
            setIndex(index - 1);
          }}
        >
          <FiChevronLeft />
        </button>
        <button
          className="next"
          onClick={() => {
            setIndex(index + 1);
          }}
        >
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
