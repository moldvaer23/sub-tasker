import type { FC, ReactElement } from "react";

import { useAppSelector } from "00-App/store";

import TodoItem from "../TodoItem/TodoItem";
import type { TSubTodo, TTodo } from "../../models/type";

import "./_style.scss";

const TodoList: FC = (): ReactElement => {
  const todos: TTodo[] = useAppSelector((state) => state.todos.todos);
  const subTodos: TSubTodo[] = useAppSelector((state) => state.subTodos.subTodos);

  return todos.length !== 0 ? (
    <ul className="section-todos__list-todos">
      {todos.map((todo) => {
        return (
          <li className="list-todos__todo-item" key={todo.id}>
            <TodoItem id={todo.id} task={todo.task} />
            {subTodos.find((object) => object.pinnedId === todo.id) && (
              <ul className="todo-item__list-subtodos">
                {subTodos.map((subTodo) => {
                  if (subTodo.pinnedId === todo.id) {
                    return (
                      <li key={subTodo.id} className="list-subtodos__subtodo-item">
                        <TodoItem id={subTodo.id} pinnedId={subTodo.pinnedId} task={subTodo.task} />
                      </li>
                    );
                  }
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  ) : (
    <></>
  );
};

export default TodoList;
