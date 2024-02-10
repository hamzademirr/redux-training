import React, { useState } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount, decrementByAmount, resetAmount } from "../redux/counter/counterSlice";

function Counter() {
  const countValue = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);

  return (
    <>
      <h1>{countValue}</h1>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(increment())}>Increment</button>

      <br />
      <br />

      <input type='number' value={amount} onChange={(event) => setAmount(event.target.value)} />
      <br />
      <button onClick={() => dispatch(decrementByAmount(amount))}>Decrement by amount</button>
      <button onClick={() => dispatch(incrementByAmount(amount))}>Increment by amount</button>

      <br />
      <br />

      <button onClick={() => dispatch(resetAmount())}>reset amount</button>
    </>
  )
}

export default Counter
