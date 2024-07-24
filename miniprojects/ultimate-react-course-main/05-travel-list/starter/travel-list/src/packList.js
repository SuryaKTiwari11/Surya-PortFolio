// import data from "./data";
import { useState } from "react";
// import React from 'react';
export default function PackList({
  items,
  onDeleteItems,
  onToggleItem,
  handleClearList,
}) {
  const [sortBy, setSortBye] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((itr) => (
          <Item
            onDeleteItems={onDeleteItems}
            desc={itr.description}
            quantity={itr.quantity}
            packed={itr.packed}
            key={itr.id}
            id={itr.id}
            onToggleItem={onToggleItem}
            handleClearList={handleClearList}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBye(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={handleClearList}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ desc, quantity, packed, onDeleteItems, id, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={packed}
        onChange={() => {
          onToggleItem(id);
        }}
      />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {desc}
      </span>
      <button onClick={() => onDeleteItems(id)}>❌</button>
    </li>
  );
}
