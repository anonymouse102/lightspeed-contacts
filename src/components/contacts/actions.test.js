import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import * as matchers from 'jest-immutable-matchers';

import * as actions from './actions';
import { InitialState } from './reducer';

const mockStore = configureMockStore([thunk]);

describe('contacts actions', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates CONTACTS_FETCH_SUCCESS when fetching contacts has been done', async () => {
    fetchMock.getOnce('/contacts?filter=', { data: [{ name : 'Some name'}] });

    const expectedActions = [
      { type: actions.CONTACTS_FETCH, filter : '' },
      { type: actions.CONTACTS_FETCH_SUCCESS, payload : { contacts : [{ name : 'Some name'}] }}
    ];

    const store = mockStore(new InitialState);

    await store.dispatch(actions.fetchContacts());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates CONTACTS_GET_SUCCESS when getting a contact has been done', async () => {
    fetchMock.getOnce('/contacts/123', { id : "123", name : 'Some name' });

    const expectedActions = [
      { type: actions.CONTACTS_GET, payload : { id : "123" } },
      { type: actions.CONTACTS_GET_SUCCESS, payload : { id : "123", name : 'Some name' } }
    ];

    const store = mockStore(new InitialState);

    await store.dispatch(actions.getContact("123"));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates CONTACT_ADD_SUCCESS when adding a contact has been done', async () => {
    fetchMock.postOnce('/contacts', { id : 123 });

    const expectedActions = [
      { type: actions.CONTACT_ADD, payload : { name : 'Name of someone' } },
      { type: actions.CONTACT_ADD_SUCCESS, payload : { name : 'Name of someone'}, id : 123 }
    ];

    const store = mockStore(new InitialState);

    await store.dispatch(actions.addContact({ name : 'Name of someone' }));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates CONTACT_UPDATE_SUCCESS when updating a contact has been done', async () => {
    fetchMock.patchOnce('/contacts/123', { id : 123 });

    const expectedActions = [
      { type: actions.CONTACT_UPDATE, payload : { name : 'Name of someone' }, id : 123 },
      { type: actions.CONTACT_UPDATE_SUCCESS, payload : { name : 'Name of someone' }, id : 123 }
    ];

    const store = mockStore(new InitialState);

    await store.dispatch(actions.updateContact(123, { name : 'Name of someone' }));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates CONTACT_DELETE_SUCCESS when deleting a contact has been done', async () => {
    fetchMock.deleteOnce('/contacts/123', {});

    const expectedActions = [
      { type: actions.CONTACT_DELETE, id : 123 },
      { type: actions.CONTACT_DELETE_SUCCESS, id : 123 }
    ];

    const store = mockStore(new InitialState);

    await store.dispatch(actions.deleteContact(123));

    expect(store.getActions()).toEqual(expectedActions);
  });
});