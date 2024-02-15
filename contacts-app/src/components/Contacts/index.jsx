import Form from './Form'
import List from "./List";

import { useSelector } from "react-redux";
import { contactSelectors } from "../../redux/contactsSlice";

function index() {
  const totalContacts = useSelector(contactSelectors.selectTotal);
  return (
    <div>
      <h1>Contacts ({totalContacts})</h1>
      <Form />
      <List />
    </div>
  )
}

export default index
