import { useState } from "react";

const UserChallenge = () => {
  const [users, setUsers] = useState(null);
  const handleLogin = () => {
    setUsers({ name: "surya kant tiwari" });
  };
  const handleLogout = () => {
    setUsers(null);
  };

  return (
    <div>
      <h2>UserChallenge</h2>
      {users ? (
        <Login users={users} onLogout={handleLogout} />
      ) : (
        <Logout onLogin={handleLogin} />
      )}
    </div>
  );
};
const Login = ({ users, onLogout }) => {
  return (
    <div>
      <h4>Please Login:{users.name}</h4>
      <button className="btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

const Logout = ({ onLogin }) => {
  return (
    <div>
      <h4>Hello There</h4>
      <button className="btn" onClick={onLogin}>
        Login
      </button>
    </div>
  );
};

export default UserChallenge;
