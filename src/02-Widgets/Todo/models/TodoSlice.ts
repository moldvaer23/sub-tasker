import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { TSubTodo, TTodo } from "05-Shared/types";

interface ITodosState {
  todos: Record<string, TTodo>;
}

// Типы Action для Main Todo
type TActionUpdateMainTodo = {
  uuid: string;
  task: string;
};

// Типы Action для Sub Todo
type TActionSubTodoInstance = {
  uuidPinTodo: string;
};

type TActionAddSubTodo = TActionSubTodoInstance & {
  subTodo: TSubTodo;
};

type TActionUpdateSubTodo = TActionSubTodoInstance & {
  uuidSubTodo: string;
  task: string;
};

type TActionDelSubTodo = TActionSubTodoInstance & {
  uuidSubTodo: string;
};

const initialState: ITodosState = {
  todos: {},
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Работа с задачами
    // Добавление новой задачи
    addTodo(state, action: PayloadAction<TTodo>) {
      const todo: TTodo = action.payload;

      state.todos[todo.uuid] = todo;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    // Нужен для инициализации приложения, по этому не сохраняем в localStorage
    setTodos(state, action: PayloadAction<Record<string, TTodo>>) {
      state.todos = action.payload;
    },

    // Обновление задачи
    updateTodo(state, action: PayloadAction<TActionUpdateMainTodo>) {
      const todoUuid: string = action.payload.uuid;

      if (todoUuid in state.todos) {
        state.todos[todoUuid].task = action.payload.task;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      } else {
        console.error(`Task with id ${todoUuid} not found.`);
      }
    },

    // Удаление задачи
    deleteTodo(state, action: PayloadAction<string>) {
      const todoUuid: string = action.payload;

      if (todoUuid in state.todos) {
        delete state.todos[todoUuid];
        localStorage.setItem("todos", JSON.stringify(state.todos));
      } else {
        console.error(`Task with id ${todoUuid} not found.`);
      }
    },

    // Работа с подзадачами
    // Добавления новой подзадачи
    addSubTodo(state, action: PayloadAction<TActionAddSubTodo>) {
      const todoUuid: string = action.payload.uuidPinTodo;
      const subTodo: TSubTodo = action.payload.subTodo;

      if (todoUuid in state.todos) {
        state.todos[todoUuid].subTodos[subTodo.uuid] = subTodo;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      } else {
        console.error(`Task with id ${todoUuid} not found.`);
      }
    },

    // Обновление подзадачи
    updateSubTodo(state, action: PayloadAction<TActionUpdateSubTodo>) {
      const todoUuid: string = action.payload.uuidPinTodo;
      const subTodoUuid: string = action.payload.uuidSubTodo;

      if (todoUuid in state.todos) {
        if (subTodoUuid in state.todos[todoUuid].subTodos) {
          state.todos[todoUuid].subTodos[subTodoUuid].task = action.payload.task;
          localStorage.setItem("todos", JSON.stringify(state.todos));
        } else {
          console.error(`Sub Task with id ${subTodoUuid} not found.`);
        }
      } else {
        console.error(`Task with id ${todoUuid} not found.`);
      }
    },

    // Удаление подзадачи
    deleteSubTodo(state, action: PayloadAction<TActionDelSubTodo>) {
      const todoUuid: string = action.payload.uuidPinTodo;
      const subTodoUuid: string = action.payload.uuidSubTodo;

      if (todoUuid in state.todos) {
        if (subTodoUuid in state.todos[todoUuid].subTodos) {
          delete state.todos[todoUuid].subTodos[subTodoUuid];
          localStorage.setItem("todos", JSON.stringify(state.todos));
        } else {
          console.error(`Sub Task with id ${subTodoUuid} not found.`);
        }
      } else {
        console.error(`Task with id ${todoUuid} not found.`);
      }
    },
  },
});

export const {
  addTodo,
  addSubTodo,
  setTodos,
  updateTodo,
  updateSubTodo,
  deleteTodo,
  deleteSubTodo,
} = todosSlice.actions;

export default todosSlice.reducer;
