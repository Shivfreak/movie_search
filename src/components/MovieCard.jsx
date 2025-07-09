import React from 'react'

const MovieCard = ({ movie, onFavorite, isFavorite }) => {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
        alt={movie.Title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-xl font-semibold text-black">{movie.Title}</h2>
      <p className="text-gray-600">Year: {movie.Year}</p>
      <button
        onClick={() => onFavorite(movie)}
        disabled={isFavorite}
        className={`mt-2 px-4 py-2 rounded text-white ${
          isFavorite ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isFavorite ? 'Added' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default MovieCard;