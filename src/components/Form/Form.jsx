import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import style from './Form.module.css';

export const Form = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInput = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(query);

    setQuery('');
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>

      <input
        className={style.input}
        onChange={handleInput}
        placeholder="What do you want to write?"
        name="search"
        required
        value={query}
        autoFocus
      />
    </form>
  );
};
