import { useEffect, useState } from "react";

const url = "https://api.github.com/users/QuincyLarson";
const MultipleReturnsFetchData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("api response was not ok");
        }
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  if (loading) {
    return <div>LOADING...</div>;
  }
  if (error)
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );
  return (
    <div>
      <h1>Fetched Data</h1>
      <ul>
        {/* Mapping over the data should be done correctly based on the API response structure */}
        <li>ID: {data.id}</li>
        <li>Name: {data.name}</li>
        <li>Location: {data.location}</li>
        <li>Public Repos: {data.public_repos}</li>
        {/* Add more fields as necessary */}
      </ul>
    </div>
  );
};
export default MultipleReturnsFetchData;
