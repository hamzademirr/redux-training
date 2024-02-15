import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export const contactAdaptor = createEntityAdapter();
const initialState = contactAdaptor.getInitialState();

export const contactSelectors = contactAdaptor.getSelectors((state) => state.contacts);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: contactAdaptor.addOne,
    addContacts: contactAdaptor.addMany,
    deleteContact: contactAdaptor.removeOne,
    deleteContactAll: contactAdaptor.removeAll,
    updateContact: contactAdaptor.updateOne,
  },
});

export const { addContact, addContacts, deleteContact, deleteContactAll, updateContact } = contactsSlice.actions;
export default contactsSlice.reducer;
