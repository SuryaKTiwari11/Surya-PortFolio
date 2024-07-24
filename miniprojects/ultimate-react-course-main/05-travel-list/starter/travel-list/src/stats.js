export default function Stats({ items }) {
  if(!items.length)
  return  <p className="stats">
    <em>
      start adding some items to your packing list 🪂
    </em>
  </p>    
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const numsPercentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {numsPercentage === 100 ? "you got everything! Ready to go ✈️" : 
        `🛍️ You have ${numItems} items on your list, and you already packed
        ${numPacked} items, you are ${numsPercentage} % there` }
      </em>
    </footer>
  );
}
