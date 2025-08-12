import React, { useState, useEffect, useMemo } from 'react'
import '../styles.css'
import MovieCard from './MovieCard'

export default function MoviesGrid({ movies, watchList, toggleWatchList }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [genre, setGenre] = useState('All Genres')
  const [rating, setRating] = useState('All')

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleGenreChange = (event) => {
    setGenre(event.target.value)
  }

  const handleRatingChange = (event) => {
    setRating(event.target.value)
  }

  const matchesGenre = (movie, genre) => {
    return (
      genre === 'All Genres' ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    )
  }

  const matchesSearchTerm = (movie, searchTerm) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  }

  const matchesRating = (movie, rating) => {
    return (
      rating === 'All' || movie.rating.toLowerCase() === rating.toLowerCase()
    )
  }

  const filteredMovies = useMemo(() => {
    return movies.filter(
      (movie) =>
        matchesGenre(movie, genre) &&
        matchesSearchTerm(movie, searchTerm) &&
        matchesRating(movie, rating)
    )
  }, [movies, searchTerm, genre, rating])

  return (
    <div>
      <input
        type='text'
        placeholder='Search movies...'
        className='search-input'
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className='filter-bar'>
        <div className='filter-slot'>
          <label htmlFor='genre'>Genre:</label>
          <select
            id='genre'
            className='filter-dropdown'
            value={genre}
            onChange={handleGenreChange}
          >
            <option>All Genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
          </select>
        </div>
        <div className='filter-slot'>
          <label htmlFor='rating'>Rating:</label>
          <select
            id='rating'
            className='filter-dropdown'
            value={rating}
            onChange={handleRatingChange}
          >
            <option>All</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>

      <div className='movies-grid'>
        {filteredMovies.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            toggleWatchList={toggleWatchList}
            isWatchList={watchList.includes(movie.id)}
          />
        ))}
      </div>
    </div>
  )
}
