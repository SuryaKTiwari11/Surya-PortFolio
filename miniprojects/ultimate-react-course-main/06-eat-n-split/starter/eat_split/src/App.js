import "./index.css";
import { children, useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showFriend, setShowFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectFriend, setSelectFriend] = useState(null);

  function handleShowFriend() {
    setShowFriend((showFriend) => !showFriend);
  }
  function handleShowOurFriend(input) {
    setFriends((friends) => [...friends, input]);
    setShowFriend(false);
  }
  function handleSetFriend(input) {
    setSelectFriend(input);
  }
  function handlerSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) => friend.id === selectFriend.id ? {...friend,balance:friend.balance+value}:friend)
    );
  }
  return (
    <div className="app">
      <div className="sidebar">
        {" "}
        <FriendList
          friends={friends}
          handleSetFriend={handleSetFriend}
          selectFriend={selectFriend}
        />
        {showFriend && (
          <FormAddFriend handleShowOurFriend={handleShowOurFriend} />
        )}
        <Button onClick={handleShowFriend}>
          {!showFriend ? "Add Friend" : "Close"}
        </Button>
        {selectFriend && (
          <FormSplitBill
            selectFriend={selectFriend}
            handlerSplitBill={handlerSplitBill}
          />
        )}
      </div>
    </div>
  );
}

function FriendList({ friends, handleSetFriend, selectFriend }) {
  const friend = friends;
  return (
    <ul>
      {friend.map((itr) => (
        <li>
          <Friend
            handleSetFriend={handleSetFriend}
            name={itr.name}
            key={itr.id}
            balance={itr.balance}
            image={itr.image}
            friends={friends}
            selectFriend={selectFriend}
            itr={itr}
          />
        </li>
      ))}
    </ul>
  );
}

function Friend({
  name,
  id,
  balance,
  image,
  handleSetFriend,
  selectFriend,
  itr,
}) {
  return (
    <li>
      <img src={image} alt={name} />
      <h1> {name}</h1>
      {balance < 0 && (
        <p className="red">
          <h2>
            {" "}
            you owe {name} {Math.abs(balance)}${" "}
          </h2>
        </p>
      )}
      {balance > 0 && (
        <p className="green">
          <h2>
            {" "}
            your {name} owes you {Math.abs(balance)}$
          </h2>
        </p>
      )}
      {balance === 0 && (
        <p>
          <h2>you and {name} are even</h2>
        </p>
      )}
      <Button
        onClick={() => {
          handleSetFriend({ name, id, balance, image });
        }}
      >
        Select
      </Button>
    </li>
  );
}
function FormAddFriend({ handleShowOurFriend }) {
  const [friendName, setFriendName] = useState("");
  const [friendImg, setFriendImg] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!friendImg || !friendName) return;
    const id = crypto.randomUUID;
    const NewFriendOBJ = {
      name: friendName,
      image: `${friendImg}?=${id}`,
      balance: 0,
      id: id,
    };
    // console.log(NewFriendOBJ);
    //after setting the name we need to reset the state
    setFriendImg("https://i.pravatar.cc/48");
    setFriendName("");
    handleShowOurFriend(NewFriendOBJ);
  }
  return (
    <form className="for-add-friend" onSubmit={handleSubmit}>
      <label>👨🏻‍🤝‍👩🏻Friend name</label>
      <input
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
        type="text"
      />
      <label>'📸 image URL</label>
      <input
        type="text"
        value={friendImg}
        onChange={(e) => setFriendImg(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function FormSplitBill({ selectFriend, handlerSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [WhoIsPaying, setWhoIsPaying] = useState("user");
  const paidByFriend = bill ? bill - paidByUser : "";
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    handlerSplitBill(WhoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split the bill with {selectFriend.name} </h2>
      <label>💸 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🤵 Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>🕴️ {selectFriend.name}'s expense</label>
      <input type="text" value={paidByFriend} disabled />

      <label>who is paying the bill</label>
      <select
        value={WhoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
