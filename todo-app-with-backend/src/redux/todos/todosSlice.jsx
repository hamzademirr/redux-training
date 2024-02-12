import { createSlice } from "@reduxjs/toolkit";
import { getTodosAsync, addTodoAsync, toggleTodoAsync, removeTodoAsync, removeCompletedTodoAsync } from "./services";

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: localStorage.getItem('activeFilter'),
    addNewTodo: {
      isLoading: false,
      error: null
    },
  },
  reducers: {
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // get Todos
      .addCase(getTodosAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getTodosAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // add Todos
      .addCase(addTodoAsync.pending, (state, action) => {
        state.addNewTodo.isLoading = true;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.addNewTodo.isLoading = false;
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.addNewTodo.isLoading = false;
        state.addNewTodo.error = action.error.message;
      })
      // toggle Todos
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        const { id, completed } = action.payload;
        const index = state.items.findIndex((item) => item.id === id);
        state.items[index].completed = completed;
      })
      //delete Todos
      .addCase(removeTodoAsync.fulfilled, (state, action) => {
        const id = action.payload;
        const index = state.items.findIndex((item) => item.id === id);
        state.items.splice(index, 1);
      })
      //delete Completed Todos
      .addCase(removeCompletedTodoAsync.fulfilled, (state, action) => {
        state.items = action.payload;
      })
  }
});

export const selectTodos = (state) => state.todos.items;
export const selectActiveFilter = (state) => state.todos.activeFilter;
export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === 'all') {
    return state.todos.items;
  }
  return state.todos.items.filter((todo) => state.todos.activeFilter === 'active' ? todo.completed === false : todo.completed === true);
}

export const { destroy, changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
