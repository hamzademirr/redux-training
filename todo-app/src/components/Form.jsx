import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { addNewTodo } from "../redux/todos/todosSlice";
function Form() {
  const [title, setTitle] = useState();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title) return;
    dispatch(addNewTodo({ title }));
    setTitle('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input value={title} className="new-todo" placeholder="What needs to be done?" onChange={(e) => setTitle(e.target.value)} autoFocus />
    </form>
  )
}

export default Form;
