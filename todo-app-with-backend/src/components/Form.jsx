import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../redux/todos/services";

import Loading from "./Loading";
import Error from "./Error";
function Form() {
  const [title, setTitle] = useState();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.todos.addNewTodo.isLoading);
  const error = useSelector((state) => state.todos.addNewTodo.error);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title) return;
    await dispatch(addTodoAsync({ title }));
    setTitle("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        disabled={isLoading}
      />
      {isLoading && <Loading />}
      {error && <Error message={error} />}
    </form>
  );
}

export default Form;
