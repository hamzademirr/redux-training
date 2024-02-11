import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [
      {
        id: 1,
        title: 'First todo',
        completed: false,
      },
      {
        id: 2,
        title: 'Second todo',
        completed: false,
      },
    ],
    activeFilter: 'all',
  },
  reducers: {
    addNewTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: ({ title }) => {
        return {
          payload: {
            id: nanoid(),
            title,
            completed: false,
        }
      }
    }
  },
  toggle: (state, action) => {
    const { id } = action.payload;
    const item = state.items.find((item) => item.id === id);
    item.completed = !item.completed;
  },
  destroy: (state, action) => {
    const id = action.payload;
    const filtered = state.items.filter((item) => item.id !== id);
    state.items = filtered;
  },
  changeActiveFilter: (state, action) => {
    state.activeFilter = action.payload;
  },
  clearCompleted: (state) => {
    const filtered = state.items.filter(item => item.completed === false);
    state.items = filtered;
  },
},
});

export const selectTodos = (state) => state.todos.items;
export const selectActiveFilter = (state) => state.todos.activeFilter;
export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === 'all') {
    return state.todos.items;
  }
  return state.todos.items.filter((todo) => state.todos.activeFilter === 'active' ? todo.completed === false : todo.completed === true);
}

export const { addNewTodo, toggle, destroy, changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
