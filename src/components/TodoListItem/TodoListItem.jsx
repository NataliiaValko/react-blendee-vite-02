import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import { GridItem, Text } from 'components';
import style from './TodoListItem.module.css';

export const TodoListItem = ({
  counter,
  text,
  id,
  deleteTodo,
  editTodo,
  isEditing,
}) => {
  return (
    <GridItem>
      <div className={style.box}>
        <Text textAlign="center" marginBottom="20">
          TODO #{counter}
        </Text>
        <Text>{text}</Text>
        <button
          className={style.deleteButton}
          type="button"
          onClick={() => deleteTodo(id)}
          disabled={isEditing}
        >
          <RiDeleteBinLine size={24} />
        </button>

        <button
          disabled={isEditing}
          onClick={() => editTodo()}
          className={style.editButton}
        >
          <RiEdit2Line size={24} />
        </button>
      </div>
    </GridItem>
  );
};
