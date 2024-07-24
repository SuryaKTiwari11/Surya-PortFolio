import { Logo } from "./Logo";
import { NumResult } from "./NumResult";
import { Search } from "./Search";

export function Navbar({ movies,query,setQuery }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search  query={query} setQuery={setQuery} />
      <NumResult movies={movies} />
    </nav>
  );
}
