import { useState } from "react";
import { MovieList } from "./MovieList";

export function ListBox({movies,onSelectMovie,}) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && <MovieList onSelectMovie={onSelectMovie} movies={movies} />}
    </div>
  );
}
