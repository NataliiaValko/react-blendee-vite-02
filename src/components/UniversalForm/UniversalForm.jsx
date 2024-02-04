import { useEffect, useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';

import style from './UniversalForm.module.css';

export const UniversalForm = ({
  onSubmit,
  updateTodo,
  cancelUpdate,
  isEditing,
  defaultValue = '',
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  const handleInput = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!isEditing) {
      onSubmit(query);
      setQuery('');
      return;
    }
    updateTodo(query);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.submitButton} type="submit">
        {!isEditing ? (
          <FiSearch size="16px" />
        ) : (
          <RiSaveLine color="green" size="16px" />
        )}
      </button>

      {isEditing && (
        <button
          onClick={() => {
            cancelUpdate();
            setQuery('');
          }}
          className={style.editButton}
          type="button"
        >
          <MdOutlineCancel color="red" size="16px" />
        </button>
      )}

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
