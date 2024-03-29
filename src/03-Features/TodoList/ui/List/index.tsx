import type { FC, ReactElement } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { ITodoModel } from "05-Shared/types";
import { useAppSelector } from "00-App/store";
import { TodoCard } from "04-Entities/TodoCard";

import "./_style.scss";

interface IProps {
  createPresentTodo: (data: { task: string; uuid: string }) => ITodoModel;
}

const TodoList: FC<IProps> = ({ createPresentTodo }): ReactElement => {
  const todos = useAppSelector((state) => state.todos.todos);

  console.log(todos);

  if (Object.keys(todos).length === 0) {
    return <p>Список задач пуст</p>;
  }

  return (
    <ul className="section-todos__list-todos">
      {Object.values(todos).map((todo, indexMain) => {
        // Создаем модель
        const todoModel = createPresentTodo({ task: todo.task, uuid: todo.uuid });

        return (
          <AnimatePresence key={indexMain}>
            <motion.li
              className="list-todos__todo-item"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}>
              <TodoCard
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
                        <TodoCard
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
