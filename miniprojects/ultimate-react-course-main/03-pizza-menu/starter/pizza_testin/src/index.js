import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "https://fast-react-pizza-menu.netlify.app/pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName:
      "https://fast-react-pizza-menu.netlify.app/pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "https://fast-react-pizza-menu.netlify.app/pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "https://fast-react-pizza-menu.netlify.app/pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "https://fast-react-pizza-menu.netlify.app/pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName:
      "https://fast-react-pizza-menu.netlify.app/pizzas/prosciutto.jpg",
    soldOut: false,
  },
];
function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
function Header() {
  //   const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}
function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  return (
    <footer className="footer">
      {isOpen ? (
        <div className="order">
          <p>we are open untill {hour}</p>
          <button className="btn">order</button>
        </div>
      ) : (
        <p>
          we are happy to welcome u {openHour}:00 and {closeHour}:00{" "}
        </p>
      )}
    </footer>
  );
}
function Menu() {
  const pizzas = pizzaData;
  const numPizza = pizzas.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>{" "}
      {numPizza > 0 ? (
        <>
          {" "}
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis
            labore tempora fugiat mollitia, provident architecto rerum ea serdon
            ferun
          </p>
          <ul className="pizzas">
            {pizzas.map((itr) => (
              <Pizza
                img={itr.photoName}
                name={itr.name}
                ingredients={itr.ingredients}
                price={itr.price}
                key={itr.name}
                isSoldOut={itr.soldOut}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>we are still working on our menu ☆*: .｡. o(≧▽≦)o .｡.:*☆</p>
      )}
    </main>
  );
}

function Pizza({ img, name, ingredients, price, isSoldOut }) {
  // if (isSoldOut) return null;
  return (
    <li className={`pizza ${isSoldOut ? "sold-out" : ""}`}>
      <img src={img} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{isSoldOut ? "Sold Out" : price}</span>
      </div>
    </li>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
