import React from "react";

const List = ({ people }) => {
  return (
    <>
      {people.map((itr) => {
        // const {image,name,age,id} =itr;
        return (
          <article key={itr.id} className="person">
            <img src={itr.image} alt={itr.name} />
            <div>
              <h4>{itr.name}</h4>
              <p>{itr.age} </p>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default List;
