import "./index.css";
import Form from "./form";
import PackList from "./packList";
import Logo from "./logo";
import Stats from "./stats";
import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleClearList() {
    const confirmed = window.confirm("are you sure u want to delete everthing");
    if (confirmed) setItems([]);
  }
  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleAddItems(input) {
    setItems((items) => [...items, input]);
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItem={handleToggleItem}
        handleClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
