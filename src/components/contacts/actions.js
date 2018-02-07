// if we were dealing with multiple types, i'd make a combined "data" reducer
// and possibly make use of the "redux-actions" library

export const CONTACTS_FETCH = 'CONTACTS_FETCH';
export const CONTACTS_FETCH_ERROR = 'CONTACTS_FETCH_ERROR';
export const CONTACTS_FETCH_SUCCESS = 'CONTACTS_FETCH_SUCCESS';

export const CONTACTS_GET = 'CONTACTS_GET';
export const CONTACTS_GET_ERROR = 'CONTACTS_GET_ERROR';
export const CONTACTS_GET_SUCCESS = 'CONTACTS_GET_SUCCESS';

export const CONTACT_ADD = 'CONTACT_ADD';
export const CONTACT_ADD_ERROR = 'CONTACT_ADD_ERROR';
export const CONTACT_ADD_SUCCESS = 'CONTACT_ADD_SUCCESS';

export const CONTACT_UPDATE = 'CONTACT_UPDATE';
export const CONTACT_UPDATE_ERROR = 'CONTACT_UPDATE_ERROR';
export const CONTACT_UPDATE_SUCCESS = 'CONTACT_UPDATE_SUCCESS';

export const CONTACT_DELETE = 'CONTACT_DELETE';
export const CONTACT_DELETE_ERROR = 'CONTACT_DELETE_ERROR';
export const CONTACT_DELETE_SUCCESS = 'CONTACT_DELETE_SUCCESS';

export const VIEW_CONTACT = 'VIEW_CONTACT';
export const CREATING_CONTACT = 'CREATING_CONTACT';
export const NOT_CREATING_CONTACT = 'NOT_CREATING_CONTACT'; // i know this is silly, but this is taking too long

export const fetchContacts = (filter = '') => async (dispatch) => {
  dispatch({ type : CONTACTS_FETCH, filter });

  try {
    const response = await fetch(`/contacts?filter=${filter}`);
    const data = await response.json();

    dispatch(contactsFetchSuccess(data.data));
  } catch (error) {
    dispatch({
      type : CONTACTS_FETCH_ERROR,
      payload : { error }
    });
  }
};

export const contactsFetchSuccess = (contacts) => ({
  type : CONTACTS_FETCH_SUCCESS,
  payload : { contacts }
});

export const getContact = (id) => async (dispatch) => {
  dispatch({ type : CONTACTS_GET, payload : { id } });

  try {
    const response = await fetch(`/contacts/${id}`);
    const payload = await response.json();

    dispatch({
      type : CONTACTS_GET_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch({
      type : CONTACTS_GET_ERROR,
      payload : { error }
    });
  }
};

export const addContact = (payload) => async (dispatch) => {
  dispatch({ type : CONTACT_ADD, payload });

  try {
    const response = await fetch('/contacts', {
      method : 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body : JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.errors) {
      dispatch({
        type : CONTACT_ADD_ERROR,
        payload : { error : data.errors }
      });
    } else {
      dispatch({
        type : CONTACT_ADD_SUCCESS,
        payload,
        id : data.id
      });
    }
  } catch (error) {
    dispatch({
      type : CONTACT_ADD_ERROR,
      payload : { error }
    });
  }
};

export const updateContact = (id, payload) => async (dispatch) => {
  dispatch({ type : CONTACT_UPDATE, id, payload });

  try {
    const response = await fetch(`/contacts/${id}`, {
      method : 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body : JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.errors) {
      dispatch({
        type : CONTACT_UPDATE_ERROR,
        payload : { error : data.errors }
      });
    } else {
      dispatch({
        type : CONTACT_UPDATE_SUCCESS,
        id : data.id,
        payload
      });
    }
  } catch (error) {
    dispatch({
      type : CONTACT_UPDATE_ERROR,
      payload : { error }
    });
  }
};

export const deleteContact = (id) => async (dispatch) => {
  dispatch({ type : CONTACT_DELETE, id });

  try {
    const response = await fetch(`/contacts/${id}`, {
      method : 'DELETE'
    });

    const data = response.json();

    if (data.errors) {
      dispatch({
        type : CONTACT_DELETE_ERROR,
        id,
        payload : { error : data.errors }
      });
    } else {
      dispatch({
        type : CONTACT_DELETE_SUCCESS,
        id
      });
    }
  } catch (error) {
    dispatch({
      type : CONTACT_DELETE_ERROR,
      id,
      payload : { error }
    });
  }
};

export const viewContact = (id) => ({
  type : VIEW_CONTACT,
  payload : { id }
});

export const createContact = (creating = true) => ({
  type : creating ? CREATING_CONTACT : NOT_CREATING_CONTACT
});