import logo from './logo.svg'
import './App.css'
import './styles.css'
import Header from './component/Header'
import Footer from './component/Footer'
import MoviesGrid from './component/MoviesGrid'
import WatchList from './component/WatchList'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function App() {
  const [movies, setMovies] = useState([])
  const [watchList, setWatchList] = useState([])

  const toggleWatchList = (movieId) => {
    setWatchList((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    )
  }

  useEffect(() => {
    fetch('movies.json')
      .then((response) => response.json())
      .then((data) => setMovies(data))
  }, [])

  return (
    <div className='App'>
      <div className='container'>
        <Header />
        <Router>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/watchlist'>Watchlist</Link>
          </nav>
          <Routes>
            <Route
              path='/'
              element={
                <MoviesGrid
                  movies={movies}
                  watchList={watchList}
                  toggleWatchList={toggleWatchList}
                />
              }
            />
            <Route
              path='/watchlist'
              element={
                <WatchList
                  movies={movies}
                  watchList={watchList}
                  toggleWatchList={toggleWatchList}
                />
              }
            />
          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App

