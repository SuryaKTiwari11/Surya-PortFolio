import React, { useState, useEffect } from "react";
import data from "./data";
import { FaAngleDoubleRight } from "react-icons/fa";

const url = "https://course-api.com/react-tabs-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState(data);
  const [value, setValue] = useState(0);

  // const fetchJobs = async () => {
  //   try {
  //     const response = await fetch(url);
  //     const newJobs = await response.json();
  //     //we would like to update our jobs
  //     setJobs(newJobs);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchJobs();
  // }, []);

  // if (loading) {
  //   return <main className="section-loading"><h2>LOADING...</h2></main>;
  // }
  const { id, order, title, dates, duties, company } = jobs[value];
  return (
    <main>
      <section className="section">
        <div className="title">
          <h2>experience</h2>
          <div className="underline"></div>
        </div>
        <div className="job-center"></div>
        {/* btn container */}
        <div className="btn-container">
          {jobs.map((itr, index) => {
            return (
              <button
                key={itr.id}
                onClick={() => {
                  setValue(index);
                }}
                className={`job-btn ${index === value && "active-btn"}`}
              >
                {itr.company}
              </button>
            );
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{title} </h3>
        </article>
        <h4>{company}</h4>
        <p className="job-dates"></p>
        {duties.map((itr, index) => {
          return (
            <div key={index} className="job-desc">
              <FaAngleDoubleRight className="job-icon" />
              <p>{itr}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default App;
