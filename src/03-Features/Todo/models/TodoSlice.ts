import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { TSubTodo, TTodo } from "./type";

interface ITodosState {
  todos: TTodo[];
}

const initialState: ITodosState = {
  todos: [],
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
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    // Нужен для инициализации приложения, по этому не сохраняем в localStorage
    setTodos(state, action: PayloadAction<TTodo[]>) {
      state.todos = action.payload;
    },
    // Обновление задачи
    updateTodo(state, action: PayloadAction<TTodo>) {
      state.todos.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.task = action.payload.task;
          localStorage.setItem("todos", JSON.stringify(state.todos));
        }
      });
    },
    // Удаление задачи
    deleteTodo(state, action: PayloadAction<number>) {
      state.todos.forEach((todo, index) => {
        if (todo.id === action.payload) {
          state.todos.splice(index, 1);
          localStorage.setItem("todos", JSON.stringify(state.todos));
        }
      });
    },

    // Работа с подзадачами
    // Добавления новой подзадачи
    addSubTodo(state, action: PayloadAction<IActionAddSubTodo>) {
      state.todos.forEach((todo) => {
        if (todo.id === action.payload.idPinnedTodo) {
          todo.subTodos.push(action.payload.subTodo);
          localStorage.setItem("todos", JSON.stringify(state.todos));
        }
      });
    },
    // Обновление подзадачи
    updateSubTodo(state, action: PayloadAction<IActionUpdateSubTodo>) {
      state.todos.forEach((todo) => {
        if (todo.id === action.payload.idPinnedTodo) {
          todo.subTodos.forEach((subTodo) => {
            if (subTodo.id === action.payload.idSubTodo) {
              subTodo.task = action.payload.task;
              localStorage.setItem("todos", JSON.stringify(state.todos));
            }
          });
        }
      });
    },
    // Удаление подзадачи
    deleteSubTodo(state, action: PayloadAction<IActionDeleteSubTodo>) {
      state.todos.forEach((todo) => {
        if (todo.id === action.payload.idPinnedTodo) {
          todo.subTodos.forEach((subTodo, index) => {
            if (subTodo.id === action.payload.idSubTodo) {
              todo.subTodos.splice(index, 1);
              localStorage.setItem("todos", JSON.stringify(state.todos));
            }
          });
        }
      });
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
