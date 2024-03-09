import type { FC, ReactElement } from "react";

import { useAppSelector } from "00-App/store";

import TodoItem from "../TodoItem/TodoItem";
import type { TTodo } from "../../models/type";

const TodoList: FC = (): ReactElement => {
  const todos: TTodo[] = useAppSelector((state) => state.todos.todos);

  return (
    <ul>
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            <TodoItem id={todo.id} task={todo.task} />
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
