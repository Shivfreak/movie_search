import { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import Favorites from './components/Favorites';
import './App.css';

const API_KEY = 'a4e1d57'; 
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('search'); 

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const searchMovies = async (title) => {
    if (!title.trim()) {
      setError('Please enter a search term');
      setMovies([]);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}&s=${encodeURIComponent(title)}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
        setError('');
      } else {
        setMovies([]);
        setError(data.Error || 'No movies found');
      }
    } catch (err) {
      setError('Failed to fetch movies');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies(searchTerm);
  };

  const addFavorite = (movie) => {
    if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (imdbID) => {
    setFavorites(favorites.filter((fav) => fav.imdbID !== imdbID));
  };

  const toggleView = () => {
    setView(view === 'search' ? 'favorites' : 'search');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">Movie Search App</h1>
          <nav>
            <button
              onClick={toggleView}
              className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-700"
            >
              {view === 'search' ? 'Favorites' : 'Search'}
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {view === 'search' ? (
          <>
            <div className="mb-6">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for movies..."
                  className="flex-grow p-2 border rounded text-black"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Search
                </button>
              </form>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {loading && <p className="text-gray-600">Loading...</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  onFavorite={addFavorite}
                  isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
                />
              ))}
            </div>
          </>
        ) : (
          <Favorites favorites={favorites} onRemove={removeFavorite} />
        )}
      </main>
    </div>
  );
}

export default App;