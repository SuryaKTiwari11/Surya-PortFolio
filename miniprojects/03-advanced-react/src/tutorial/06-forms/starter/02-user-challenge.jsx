import { useState } from "react";
import { data } from "../../../data";
const UserChallenge = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    console.log("form submitted");
  };
  const [name, setName] = useState("");
  const [users, setUsers] = useState(data);
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h4>Add User</h4>
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input
            type="text"
            className="form-input"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-block">
          submit
        </button>
        <h4>users</h4>
        {users.map((itr) => {
          return <h2 key={itr.id}>{itr.name}</h2>;
        })}
      </form>
      {/* render users below */}
    </div>
  );
};
export default UserChallenge;
