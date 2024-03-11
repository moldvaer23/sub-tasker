import type { FC, ReactElement } from "react";

import { useAppSelector } from "00-App/store";

import TodoItem from "../TodoItem/TodoItem";
import type { TTodo } from "../../models/type";

import "./_style.scss";

const TodoList: FC = (): ReactElement => {
  const todos: TTodo[] = useAppSelector((state) => state.todos.todos);

  return todos.length !== 0 ? (
    <ul className="section-todos__list-todos">
      {todos.map((todo) => {
        return (
          <li className="list-todos__todo-item" key={todo.id}>
            <TodoItem id={todo.id} task={todo.task} />
          </li>
        );
      })}
    </ul>
  ) : (
    <></>
  );
};

export default TodoList;
