import React, { useState } from "react";
import people from "./data";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const Review = () => {
  const checkNumber = (number) => {
    if (number > people.length - 1) {
      return 0;
    }
    if (number < 0) {
      return people.length - 1;
    }
    return number;
  };
  const nextPerson = () => {
    setIndex((index) => {
      let NewIndex = index + 1;
      return checkNumber(NewIndex);
    });
  };
  const prevPerson = () => {
    setIndex((index) => {
      let NewIndex = index - 1;
      return checkNumber(NewIndex);
    });
  };
  const radomIndex = () => {
    let randomNumber = Math.floor(Math.random() * people.length);
    if (randomNumber === index) {
      randomNumber++;
    }

    setIndex(checkNumber(randomNumber));
  };
  const [index, setIndex] = useState(0);
  const { name, job, image, text } = people[index];
  return (
    <article className="review">
      <div className="image-container">
        <img src={image} alt={name} className="person-img" />
        <span>
          <FaQuoteRight />
        </span>
      </div>
      <h4 className="author">{name}</h4>
      <p className="job">{job}</p>
      <p className="'info">{text}</p>
      <div className="button-container">
        <button class="prev-btn" onclick={prevPerson}>
          <FaChevronLeft />
        </button>
        <button class="next-btn" onClick={nextPerson}>
          <FaChevronRight />
        </button>
        <button class="random-btn" onclick={radomIndex}> suprise me</button>
      </div>
    </article>
  );
};

export default Review;
