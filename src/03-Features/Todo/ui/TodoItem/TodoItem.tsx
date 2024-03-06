import { FC, useState } from "react";
import TodoModel from "../../models/TodoModel";

interface TProps {
  task: string;
  id: number;
}

const TodoItem: FC<TProps> = ({ task, id }) => {
  const [todo, setTodo] = useState<TodoModel>(new TodoModel({ task: task, id: id }));

  return (
    <article>
      <button
        onClick={() => {
          const updatedTodo = todo.changeTask("Изменено");

          setTodo(updatedTodo);
        }}>
        Редактировать
      </button>
      {todo.task}
    </article>
  );
};

export default TodoItem;
