import type { FC, ReactElement } from "react";

import { useAppSelector } from "00-App/store";

import type { TTodo } from "../../models/type";
import SubTodoItem from "../SubTodoItem/SubTodoItem";
import MainTodoItem from "../MainTodoItem/MainTodoItem";

import "./_style.scss";

const TodoList: FC = (): ReactElement => {
  const todos: Record<number, TTodo> = useAppSelector((state) => state.todos.todos);

  return (
    <ul className="section-todos__list-todos">
      {Object.values(todos).length !== 0 &&
        Object.values(todos).map((todo) => {
          return (
            <li className="list-todos__todo-item" key={todo.id}>
              <MainTodoItem id={todo.id} task={todo.task} />

              {Object.values(todo.subTodos).length !== 0 && (
                <ul className="todo-item__list-subtodos">
                  {Object.values(todo.subTodos).map((subTodo) => {
                    return (
                      <li className="list-subtodos__subtodo-item" key={subTodo.id}>
                        <SubTodoItem id={subTodo.id} idPinnedTodo={todo.id} task={subTodo.task} />
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default TodoList;
