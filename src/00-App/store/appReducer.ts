import { combineReducers } from "@reduxjs/toolkit";

import TodoSlice from "05-Shared/models/TodoSlice";

export const rootReducer = combineReducers({
  todos: TodoSlice,
});
