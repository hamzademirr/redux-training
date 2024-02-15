import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from "@reduxjs/toolkit";
import { addContact } from '../../redux/contactsSlice';

function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !number) return false;
    dispatch(addContact({ id: nanoid(), name: name, number: number }));
    setName('');
    setNumber('');
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder='phone number' value={number} onChange={(e) => setNumber(e.target.value)} />
        <div className='btn'>
          <button type='submit'>Add</button>
        </div>
      </form>
    </div>
  )
}

export default Form
