import "./index.css";
import { Navbar } from "./navbar/Navbar";
import { WatchedBox } from "./watched/WatchedBox";
import { ListBox } from "./List/ListBox";
import { tempMovieData } from "./data/tempMovieData";
import { useEffect, useRef, useState } from "react";
// import { StartRating } from "./StartRating";
import StartRating from "./StartRating";
import { tempWatchedData } from "./data/tempWatchedData";

const key = "d0eb65f9";
const tempQuery = "interstellar";
// Send all data requests to:
//http://www.omdbapi.com/?apikey=[yourkey]&
// Poster API requests:
//http://img.omdbapi.com/?apikey=[yourkey]&
function Loading() {
  return <p className="loader">LOADING...</p>;
}
export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedID, setSelectedID] = useState("");
  const [query, setQuery] = useState("");

  // const [watched, setWatched] = useState([]);

  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  function handleSelectedMovie(id) {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }
  function handleCloseMovie() {
    setSelectedID("");
  }
  function handleWatchedMovie(input) {
    setWatched((watched) => [...watched, input]);
    // localStorage.setItem(" watched",JSON.stringify([...watched,movies]));
  }
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((itr) => itr.imdbID !== id));
  }
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setisLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`
          );
          if (!res.ok) throw new Error("some thing went wrong");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie Not found");
          setMovies(data.Search);
          setisLoading(false);
        } catch (error) {
          console.error(error.message);
          setError(error.message);
        } finally {
          setisLoading(false);
        }
      }

      fetchMovies();
    },
    [query]
  );
  useEffect(function () {
    function CallBack(e) {
      if (e.code === "Escape") {
        handleCloseMovie();
      }
    }
    document.addEventListener("keydown", CallBack);
    return function () {
      document.removeEventListener("keydown", CallBack);
    };
  }, []);

  return (
    <>
      <Navbar movies={movies} setQuery={setQuery} query={query} />
      <main className="main">
        {isLoading ? (
          <Loading />
        ) : (
          <ListBox onSelectMovie={handleSelectedMovie} movies={movies} />
        )}
        {selectedID ? (
          <MovieDetails
            onCloseMovie={handleCloseMovie}
            selectedID={selectedID}
            handleWatchedMovie={handleWatchedMovie}
          />
        ) : (
          <WatchedBox
            watched={watched}
            handleDeleteWatched={handleDeleteWatched}
          />
        )}
      </main>
    </>
  );
}
function MovieDetails({
  selectedID,
  onCloseMovie,
  handleWatchedMovie,
  watched,
}) {
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState("");
  const CountRef = useRef(0);
  useEffect(
    function () {
      if (userRating) CountRef.current = CountRef.current + 1;
    },
    [userRating]
  );
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actor: actors,
    Director: director,
    Genre: genre,
    // countRatingDecision: CountRef.current,
  } = movie;
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;
  function handleAdd() {
    const newMovie = {
      imdbRating: selectedID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
    };
    handleWatchedMovie(newMovie);
  }
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getMovieDetails() {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${selectedID}`,
          { signal }
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(err.message);
        }
      }
    }

    getMovieDetails();

    return () => {
      controller.abort();
    };
  }, [selectedID, key]);
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie: ${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );
  return (
    <div className="details">
      {" "}
      <button lassName="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
      <header>
        <img src={poster} alt={`poster of ${movie}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released}&bull; {runtime}
          </p>
          <p>
            <span>⭐</span>
            {imdbRating}
          </p>

          <section>
            <div className="rating">
              <StartRating />
              <button className="btn-add" onClick={handleAdd}>
                add to list
              </button>
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Staring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      </header>
    </div>
  );
}
