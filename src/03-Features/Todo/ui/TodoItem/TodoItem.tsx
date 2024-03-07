import { FC } from "react";
import { useAppDispatch } from "00-App/store";
import { TTodo } from "../../models/type";
import { deleteTodo, updateTodo } from "../../models/TodoSlice";
import TodoModel from "../../models/TodoModel";

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
