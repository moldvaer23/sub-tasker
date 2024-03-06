import { FC } from "react";
import TodoModel from "../../models/TodoModel";
import { useAppDispatch } from "00-App/store";
import { updateTodo } from "03-Features/Todo/models/TodoSlice";

interface TProps {
  task: string;
  id: number;
}

const TodoItem: FC<TProps> = ({ task, id }) => {
  const todo: TodoModel = new TodoModel({ task: task, id: id });
  const dispath = useAppDispatch();

  return (
    <article>
      <button
        onClick={() => {
          const updatedTodo = todo.changeTask("Изменено");

          dispath(updateTodo(updatedTodo));
        }}>
        Редактировать
      </button>
      {todo.task}
    </article>
  );
};

export default TodoItem;
