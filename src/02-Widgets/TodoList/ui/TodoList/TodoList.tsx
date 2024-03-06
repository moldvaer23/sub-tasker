import { FC } from "react";
import { useAppSelector } from "00-App/store";
import { TodoItem } from "02-Widgets/TodoItem";

const TodoList: FC = () => {
  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <ul>
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            <TodoItem task={todo.task} />
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
