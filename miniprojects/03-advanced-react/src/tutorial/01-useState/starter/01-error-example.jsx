const ErrorExample = () => {
  let count = 0;
  return (
    <div>
      <h2>useState error example</h2>
      <h1>{count}</h1>
      <button type="button" className="btn" onClick={()=>count++}>INCREMENT</button>
    </div>
  );
};

export default ErrorExample;
