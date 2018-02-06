import * as actions from './actions';
import { List, Record } from 'immutable';
import { createReducer } from '../../utils';

export const InitialState = Record({
  items : new List(),
  isFetching : false,
  selectedContact : null
});

export const Contact = Record({
  id : '',
  name : '',
  job_title : '',
  address : '',
  emails: [],
  phone_numbers : [],
  picture_url : ''
});

function updateContact(state, id, updater) {
  return state.updateIn(['items'], contacts =>
    List(contacts).map(contact => {
      return contact.id === id
        ? updater(contact)
        : contact;
    })
  );
}

export default createReducer(InitialState, {
  [actions.CONTACTS_FETCH] : (state) => state.set('isFetching', true),
  [actions.CONTACTS_FETCH_ERROR] : (state) => state.set('isFetching', false),
  [actions.CONTACTS_FETCH_SUCCESS] : (state, { payload }) => {
    const newContacts = payload.contacts.map(contact => new Contact(contact));
    return state.set('isFetching', false).set('items', new List(newContacts));
  },

  [actions.CONTACTS_GET_SUCCESS] : (state, { payload }) =>
    state.updateIn(['items'], contacts =>
      contacts.filter(contact => contact.id !== payload.id).push(new Contact(payload))
    ),

  [actions.CONTACT_ADD_SUCCESS] : (state, { payload, id }) =>
    state.updateIn(['items'], contacts => 
      contacts.push(new Contact({id, ...payload}))),

  // [actions.CONTACT_ADD_ERROR] 

  [actions.CONTACT_UPDATE_SUCCESS] : (state, { payload, id }) =>
    updateContact(state, id, contact => contact.merge(payload)),

  [actions.CONTACT_DELETE_SUCCESS] : (state, { id }) =>
    state.updateIn(['items'], contacts =>
      contacts.filter(contact => contact.id !== id)),

  [actions.VIEW_CONTACT] : (state, { payload }) => 
    state.set('selectedContact', payload.id),

  // TODO make use of the other actions, we can use them to animate the front-end
  // and log errors
});

export const pickContact = (state, id) =>
  state.contacts.items.filter(item => item.id === id).get(0);