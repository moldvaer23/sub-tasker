import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { TSubTodo, TTodo } from "./type";

interface ITodosState {
  todos: Record<number, TTodo>;
}

const initialState: ITodosState = {
  todos: {},
};

interface IActionAddSubTodo {
  idPinnedTodo: number;
  subTodo: TSubTodo;
}

interface IActionUpdateSubTodo {
  idPinnedTodo: number;
  idSubTodo: number;
  task: string;
}

interface IActionDeleteSubTodo {
  idPinnedTodo: number;
  idSubTodo: number;
}

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Работа с задачами
    // Добавление новой задачи
    addTodo(state, action: PayloadAction<TTodo>) {
      const todo: TTodo = action.payload;

      state.todos[todo.id] = todo;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    // Нужен для инициализации приложения, по этому не сохраняем в localStorage
    setTodos(state, action: PayloadAction<TTodo[]>) {
      state.todos = action.payload;
    },

    // Обновление задачи
    updateTodo(state, action: PayloadAction<TTodo>) {
      const todoId: number = action.payload.id;

      if (todoId in state.todos) {
        state.todos[todoId].task = action.payload.task;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      } else {
        console.error(`Task with id ${todoId} not found.`);
      }
    },

    // Удаление задачи
    deleteTodo(state, action: PayloadAction<number>) {
      const todoId: number = action.payload;

      if (todoId in state.todos) {
        delete state.todos[todoId];
        localStorage.setItem("todos", JSON.stringify(state.todos));
      } else {
        console.error(`Task with id ${todoId} not found.`);
      }
    },

    // Работа с подзадачами
    // Добавления новой подзадачи
    addSubTodo(state, action: PayloadAction<IActionAddSubTodo>) {
      const todoId: number = action.payload.idPinnedTodo;
      const subTodo: TSubTodo = action.payload.subTodo;

      if (todoId in state.todos) {
        state.todos[todoId].subTodos[subTodo.id] = subTodo;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      } else {
        console.error(`Task with id ${todoId} not found.`);
      }
    },

    // Обновление подзадачи
    updateSubTodo(state, action: PayloadAction<IActionUpdateSubTodo>) {
      const todoId: number = action.payload.idPinnedTodo;
      const subTodoId: number = action.payload.idSubTodo;

      if (todoId in state.todos) {
        if (subTodoId in state.todos[todoId]) {
          state.todos[todoId].subTodos[subTodoId].task === action.payload.task;
          localStorage.setItem("todos", JSON.stringify(state.todos));
        } else {
          console.error(`Sub Task with id ${subTodoId} not found.`);
        }
      } else {
        console.error(`Task with id ${todoId} not found.`);
      }
    },

    // Удаление подзадачи
    deleteSubTodo(state, action: PayloadAction<IActionDeleteSubTodo>) {
      const todoId: number = action.payload.idPinnedTodo;
      const subTodoId: number = action.payload.idSubTodo;

      if (todoId in state.todos) {
        if (subTodoId in state.todos[todoId].subTodos) {
          delete state.todos[todoId].subTodos[subTodoId];
          localStorage.setItem("todos", JSON.stringify(state.todos));
        } else {
          console.error(`Sub Task with id ${subTodoId} not found.`);
        }
      } else {
        console.error(`Task with id ${todoId} not found.`);
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
