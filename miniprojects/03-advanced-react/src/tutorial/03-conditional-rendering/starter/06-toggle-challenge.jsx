import { useState } from "react";

const ToggleChallenge = () => {
  const [Boolean, setBoolean] = useState(false);
  const flipButton = () => {
    if (Boolean) {
      setBoolean(false);
    } else {
      setBoolean(true);
    }
  };

  return (
    <div>
      <h2>toggle challenge</h2>
      <button className="btn" onClick={flipButton}>toogle</button>

      {Boolean && <Alert />}
    </div>
  );
};
const Alert = () => {
  return <div className="alert alert-danger">hello world </div>;
};

export default ToggleChallenge;
