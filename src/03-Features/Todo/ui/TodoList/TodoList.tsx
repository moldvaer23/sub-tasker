import type { FC, ReactElement } from "react";

import { AnimatePresence, motion } from "framer-motion";

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
        <AnimatePresence key={indexMain}>
          <motion.li
            className="list-todos__todo-item"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}>
            <MainTodoItem uuid={todo.uuid} task={todo.task} />

            {Object.values(todo.subTodos).length > 0 && (
              <ul className="todo-item__list-subtodos">
                {Object.values(todo.subTodos).map((subTodo, indexSub) => (
                  <motion.li
                    className="list-subtodos__subtodo-item"
                    key={indexSub}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}>
                    <SubTodoItem uuid={subTodo.uuid} uuidPinTodo={todo.uuid} task={subTodo.task} />
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.li>
        </AnimatePresence>
      ))}
    </ul>
  );
};

export default TodoList;
