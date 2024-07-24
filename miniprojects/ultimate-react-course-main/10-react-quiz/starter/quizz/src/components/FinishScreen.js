function FinishScreen({ pointSum, points, dispatch }) {
  const pointPercentage = (points / pointSum) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}/</strong> out of <strong>{pointSum}</strong>
        {""}
        <br />
        {Math.ceil(pointPercentage)} %
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
