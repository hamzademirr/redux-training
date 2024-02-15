import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import { NavLink } from "react-router-dom";
function Item({ item }) {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteContact(id));
    }
  }
  return (
      <li>
        <span>{item.name}</span>
        <span>{item.number}</span>
        <div className="btn-collection">
        <span className='editBtn'><NavLink to={`/edit/${item.id}`}>Edit</NavLink></span>
        <span className='deleteBtn' onClick={() => handleDelete(item.id)}>x</span>
        </div>
      </li>
  )
}

export default Item
