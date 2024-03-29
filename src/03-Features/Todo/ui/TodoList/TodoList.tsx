import type { FC, ReactElement } from "react";

import { AnimatePresence, motion } from "framer-motion";

import TodoModel from "03-Features/Todo/models/TodoModel";
import { useAppDispatch, useAppSelector } from "00-App/store";

import TodoItem from "../TodoItem/TodoItem";
import type { TTodo } from "../../models/type";

import "./_style.scss";

const TodoList: FC = (): ReactElement => {
  const todos: Record<number, TTodo> = useAppSelector((state) => state.todos.todos);

  console.log(todos);

  const dispatch = useAppDispatch();

  if (Object.keys(todos).length === 0) {
    return <p>Список задач пуст</p>;
  }

  return (
    <ul className="section-todos__list-todos">
      {Object.values(todos).map((todo, indexMain) => {
        // Создаем модель
        const todoModel = new TodoModel({ uuid: todo.uuid, task: todo.task, dispatch: dispatch });

        return (
          <AnimatePresence key={indexMain}>
            <motion.li
              className="list-todos__todo-item"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}>
              <TodoItem
                task={todo.task}
                handleDelete={() => todoModel.deleteTodo()}
                handleSubmit={(changeTask: string) =>
                  todoModel.editTodo({ task: changeTask, uuid: todoModel.uuid })
                }
                handleCreateSubTodo={() => todoModel.createSubTodo({ task: "Введите текст" })}
              />

              {Object.values(todo.subTodos).length > 0 && (
                <ul className="todo-item__list-subtodos">
                  {Object.values(todo.subTodos).map((subTodo, indexSub) => {
                    // Создаем и получаем объект подзадачи
                    const subTodoObj = todoModel.createSubTodo({
                      uuid: subTodo.uuid,
                      task: subTodo.task,
                    });

                    return (
                      <motion.li
                        className="list-subtodos__subtodo-item"
                        key={indexSub}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}>
                        <TodoItem
                          task={subTodoObj.task}
                          handleDelete={() =>
                            todoModel.deleteSubTodo({
                              uuidPinTodo: todoModel.uuid,
                              uuidSubTodo: subTodoObj.uuid,
                            })
                          }
                          handleSubmit={(changeTask: string) =>
                            todoModel.editSubTodo({ task: changeTask, uuid: subTodoObj.uuid })
                          }
                          isSubTodo
                        />
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </motion.li>
          </AnimatePresence>
        );
      })}
    </ul>
  );
};

export default TodoList;
