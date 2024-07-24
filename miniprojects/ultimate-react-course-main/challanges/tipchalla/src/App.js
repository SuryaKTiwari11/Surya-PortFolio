import { useState } from "react";
function App() {
  return <TipCalculator />;
}

export default App;

function TipCalculator() {
  const [amount, setAmount] = useState(0);
  const [perc1, setPerc1] = useState(0);
  const [perc2, setPerc2] = useState(0);
  return (
    <div>
      <BillInput amount={amount} setAmount={setAmount} />

      <SelectPercentage perc={perc1} setPerc={setPerc1}>
        how did you like the food
      </SelectPercentage>

      <SelectPercentage perc={perc2} setPerc={setPerc2}>
        how did your friend like the service{" "}
      </SelectPercentage>

      <Output amount={amount} perc1={perc1} perc2={perc2} />
      <Reset setAmount={setAmount} setPerc1={setPerc1} setPerc2={setPerc2} />
    </div>
  );
}
function BillInput({ amount, setAmount }) {
  return (
    <div className="box">
      <div>
        <h2>how much do u want for the bill?</h2>
        <input
          type="text"
          placeholder="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        ></input>
      </div>
    </div>
  );
}

function SelectPercentage({ children, perc, setPerc }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={perc}
        onChange={(e) => setPerc(Number(e.target.value))}
      >
        <option value="0">dissatisfied 0%</option>
        <option value="5">it was ok 5%</option>
        <option value="10">it was gud 10%</option>
        <option value="20">Amazing 20%</option>
      </select>
    </div>
  );
}

function Output({ amount, perc1, perc2 }) {
  const amount1 = (amount * perc1) / 100;
  const amount2 = (amount * perc2) / 100;
  const amountTip = amount1 + amount2;
  return  <h2>{`you payed ${amount + amountTip} tip amount (${amountTip})`}</h2>;
}
function Reset({ setAmount, setPerc1, setPerc2 }) {
 return <button
    onClick={() => {
      setAmount(0);
      setPerc1(0);
      setPerc2(0);
    }}
  >
    RESET
  </button>;
}
