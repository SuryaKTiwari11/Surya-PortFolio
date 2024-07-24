import { useState } from "react";

const UseStateObject = () => {
  const [name, setName] = useState("peter");
  const [age, setAge] = useState(24);
  const [hobby, setHobby] = useState("playing COC");
  // const Random = (name, age, hobby) => {
  //   setName("john");
  //   setAge(45);
  //   setHobby("screams at me ");
  // };
  const UseStateObject = () => {
    const [person, setPerson] = useState({
      name: "peter",
      age: 24,
      hobby: "reads books",
    });
  };
  const displayPerson = () => {
    setPerson({ ...person,name:'susan'});
    // setPerson({ name: "john", age: 28, hobby: "plays with children" });
  };
  return (
    <>
      <h2>useState object example</h2>
      <h3>{person.name}</h3>
      <h3>{person.age}</h3>
      <h3>{person.hobby}</h3>
      <button onClick={displayPerson} className="btn" type="button">
        ClickME
      </button>
    </>
  );
};

export default UseStateObject;
