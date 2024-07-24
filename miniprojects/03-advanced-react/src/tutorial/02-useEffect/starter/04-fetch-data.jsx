import { useEffect } from "react";
import { useState } from "react";

const url = "https://api.github.com/users";

const FetchData = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const FetchData = async () => {
      const response = await fetch(url);
      const users = await response.json();
      setUsers(users);
    };
    FetchData();
  }, []);
  return (
    <section>
      <h3>github Users</h3>
      <ul className="users">
        {users.map((itr) => {
          console.log(users);
          const { id, login, avatar_url, html_url } = itr;
          return (
            <li key={id}>
              <img src={avatar_url} alt={login} />
              <div>
                <h5>{login}</h5>
                <a href={html_url}>profile</a>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default FetchData;
