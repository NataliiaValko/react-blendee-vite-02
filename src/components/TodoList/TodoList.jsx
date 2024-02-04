import { Grid, TodoListItem } from 'components';

export const TodoList = ({ todos, deleteTodo, editTodo, isEditing }) => {
  return (
    <Grid>
      {todos.map((todo, index) => (
        <TodoListItem
          key={todo.id}
          {...todo}
          isEditing={isEditing}
          counter={index + 1}
          deleteTodo={deleteTodo}
          editTodo={() => editTodo(todo)}
        />
      ))}
    </Grid>
  );
};
