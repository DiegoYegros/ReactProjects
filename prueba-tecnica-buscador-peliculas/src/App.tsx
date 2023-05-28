import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies.tsx'
import { useMovies } from './hooks/useMovies.ts'
import { Buses } from './components/Buses.tsx'


function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState('')
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
    }
    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if (search.match(/^[0-9]+$/)) {
      setError('No se puede buscar un numero')
      return
    }
    if (search.length < 3) {
      setError('No se puede buscar una palabra de menos de 3 letras')
      return
    }
    setError(null)
  }, [search])
  return [search, updateSearch, error]
}
function App() {
  const [sort, setSotrt] = useState(false)
  const [search, updateSearch, error] = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }
  const handleChange = (event) => {
    updateSearch(event.target.value)
  }
  const handleSort = () => {
    setSotrt(!sort)
  }
  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input name='query' onChange={handleChange} value={search} placeholder='Avengers, Star Wars...' />
          <input type='checkbox' onChange={handleSort} checked={sort}></input>
          <button type='submit'>Buscar</button>
        </form>
        {error && <p className='error-message'>{error}</p>}
      </header>

      <main>
        {loading ? <p>Loading...</p> : <Movies movies={movies} />}
        <Buses />
      </main>

    </div>
  )
}

export default App
