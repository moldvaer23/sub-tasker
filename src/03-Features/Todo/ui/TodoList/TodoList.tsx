import type { FC, ReactElement } from "react";

import { useAppSelector } from "00-App/store";

import type { TTodo } from "../../models/type";
import SubTodoItem from "../SubTodoItem/SubTodoItem";
import MainTodoItem from "../MainTodoItem/MainTodoItem";

import "./_style.scss";

const TodoList: FC = (): ReactElement => {
  const todos: Record<number, TTodo> = useAppSelector((state) => state.todos.todos);

  if (Object.keys(todos).length === 0) {
    return <p>Список задач пуст</p>;
  }

  return (
    <ul className="section-todos__list-todos">
      {Object.values(todos).map((todo, indexMain) => (
        <li className="list-todos__todo-item" key={indexMain}>
          <MainTodoItem uuid={todo.uuid} task={todo.task} />

          {Object.values(todo.subTodos).length > 0 && (
            <ul className="todo-item__list-subtodos">
              {Object.values(todo.subTodos).map((subTodo, indexSub) => (
                <li className="list-subtodos__subtodo-item" key={indexSub}>
                  <SubTodoItem uuid={subTodo.uuid} uuidPinTodo={todo.uuid} task={subTodo.task} />
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
