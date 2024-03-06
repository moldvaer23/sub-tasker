import { combineReducers } from "@reduxjs/toolkit";

import TodoSlice from "03-Features/Todo/models/TodoSlice";

export const rootReducer = combineReducers({
  todos: TodoSlice,
});
