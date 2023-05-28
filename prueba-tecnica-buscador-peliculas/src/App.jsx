import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';
import { Buses } from './components/Buses';

function useSearch() {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState('');
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
    }
    if (search === '') {
      setError('No se puede buscar una película vacía');
      return;
    }
    if (search.match(/^[0-9]+$/)) {
      setError('No se puede buscar un número');
      return;
    }
    if (search.length < 3) {
      setError('No se puede buscar una palabra de menos de 3 letras');
      return;
    }
    setError('');
  }, [search]);

  return [search, updateSearch, error];
}

function App() {
  const [sort, setSort] = useState(false);
  const [search, updateSearch, error] = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
  };

  const handleChange = (event) => {
    updateSearch(event.target.value);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input name="query" onChange={handleChange} value={search} placeholder="Avengers, Star Wars..." />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </header>
      <main>
        {loading ? <p>Loading...</p> : <Movies movies={movies} />}
        <Buses />
      </main>
    </div>
  );
}

export default App;
