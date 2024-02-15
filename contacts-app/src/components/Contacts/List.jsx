import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { contactSelectors } from "../../redux/contactsSlice";
import { deleteContactAll } from "../../redux/contactsSlice";
import Item from "./Item";
function List() {
  const contacts = useSelector(contactSelectors.selectAll);
  const dispatch = useDispatch();
  const handleDeleteAll = () => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteContactAll());
    }
  }
  return (
    <>
      <div className='delete-all-btn' onClick={() => handleDeleteAll()}>{contacts.length > 0 ? contacts.length > 1 ? 'Delete All' : 'Delete' : ''}</div>
      <ul className='list'>
        {contacts.map((contact) => (
          <Item key={contact.id} item={contact} />
        ))}
      </ul>
    </>
  )
}

export default List
