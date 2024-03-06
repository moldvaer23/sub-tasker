import { FC } from "react";
import TodoModel from "../../models/TodoModel";
import { useAppDispatch } from "00-App/store";
import { deleteTodo, updateTodo } from "03-Features/Todo/models/TodoSlice";
import { TTodo } from "03-Features/Todo/models/type";

interface TProps {
  id: number;
  task: string;
}

const TodoItem: FC<TProps> = ({ id, task }) => {
  const dispath = useAppDispatch();

  // Создаем модель Todo
  const todoModel: TodoModel = new TodoModel({ id: id, task: task });

  // Запрашиваем объект Todo
  const todo: TTodo = todoModel.getTodo;

  return (
    <article>
      <button
        onClick={() => {
          const updatedTodo: TTodo = todoModel.changeTask("Изменено").getTodo;

          dispath(updateTodo(updatedTodo));
        }}>
        Редактировать
      </button>
      <button
        onClick={() => {
          dispath(deleteTodo(todo.id));
        }}>
        Удалить
      </button>
      {todo.task}
    </article>
  );
};

export default TodoItem;
