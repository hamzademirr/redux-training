import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateContact } from "../../redux/contactsSlice";

function EditForm({ contact }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !number) return false;
    dispatch(updateContact({ id: contact.id, changes: { name, number } }));
    navigate('/');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder='phone number' value={number} onChange={(e) => setNumber(e.target.value)} />
      <div className='btn'>
        <button type='submit'>Update</button>
      </div>
    </form>
  )
}

export default EditForm
