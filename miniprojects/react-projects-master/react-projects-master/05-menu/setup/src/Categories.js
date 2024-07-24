import React from "react";

const Categories = ({ categories, filterItem }) => {
  return (
    <div className="btn-container">
      {categories.map((itr, index) => {
        return (
          <button type="button" className="filter-btn" key={index} onClick={()=>filterItem(itr)}>{itr}</button>
        );
      })}
    </div>
  );
};

export default Categories;
