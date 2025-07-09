import React from 'react'

const Favorites = ({ favorites, onRemove }) => {
  return (
    <div>
      <h2 className="text-2xl text-black font-bold mb-4">Your Favorites</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-600">No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="bg-white p-4 rounded shadow">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
                alt={movie.Title}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold text-black">{movie.Title}</h2>
              <p className="text-gray-600">Year: {movie.Year}</p>
              <button
                onClick={() => onRemove(movie.imdbID)}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;