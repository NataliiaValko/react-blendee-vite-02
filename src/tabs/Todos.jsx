import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { EditForm, Form, Text, TodoList } from 'components';

export const Todos = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const addTodo = text => {
    if (fintTodo(text)) return;

    setTodos(prevTodos => [...prevTodos, { text, id: nanoid() }]);
  };

  const deleteTodo = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const editTodo = todo => {
    setIsEditing(!isEditing);
    setCurrentTodo({ ...todo });
  };

  const updateTodo = text => {
    if (fintTodo(text)) return;

    setTodos(
      todos.map(todo => {
        return todo.id === currentTodo.id ? { ...currentTodo, text } : todo;
      }),
    );

    cancelUpdate();
  };

  const fintTodo = text => {
    const isExist = todos.find(
      todo => todo.text.toLowerCase() === text.toLowerCase(),
    );

    if (isExist) {
      Notify.info(
        `Todo ${text} already esixt. First complete the previous todo😉`,
      );
    }

    return isExist;
  };

  const cancelUpdate = () => {
    setIsEditing(!isEditing);
    setCurrentTodo({});
  };

  return (
    <>
      {isEditing ? (
        <EditForm
          updateTodo={updateTodo}
          cancelUpdate={cancelUpdate}
          defaultValue={currentTodo.text}
        />
      ) : (
        <Form onSubmit={addTodo} />
      )}
      {/* <UniversalForm
        onSubmit={addTodo}
        updateTodo={updateTodo}
        isEditing={isEditing}
        defaultValue={currentTodo.text}
        cancelUpdate={cancelUpdate}
      /> */}
      {!todos.length ? (
        <Text textAlign="center">There are no any todos ...</Text>
      ) : (
        <TodoList
          isEditing={isEditing}
          todos={todos}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      )}
    </>
  );
};
