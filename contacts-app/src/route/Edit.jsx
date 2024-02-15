import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import EditForm from '../components/EditContacts/EditForm'
import { contactSelectors } from "../redux/contactsSlice";

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const contact = useSelector(state => contactSelectors.selectById(state, id));

  useEffect(() => {
    if (!contact) {
      console.log('no contact');
      navigate('/');
    }
  }, [contact])

  return (
    <>
      <h1>Edit</h1>
      {contact && <EditForm contact={contact} />}
    </>
  )
}

export default Edit
