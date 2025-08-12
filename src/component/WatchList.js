import React, { useState, useEffect, useMemo } from 'react'
import '../styles.css'
import MovieCard from './MovieCard'

export default function WatchList({ movies, watchList, toggleWatchList }) {
  return (
    <div>
      <h1 className='title'>Your WatchList</h1>
      <div className='watchlist'>
        {watchList.map((id) => {
          const movie = movies.find((movie) => movie.id === id)
          return (
            <MovieCard
              key={id}
              movie={movie}
              toggleWatchList={toggleWatchList}
              isWatchList={true}
            />
          )
        })}
      </div>
    </div>
  )
}
