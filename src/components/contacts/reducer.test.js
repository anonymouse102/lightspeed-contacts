import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import * as matchers from 'jest-immutable-matchers';
import { Record, List } from 'immutable';

import * as actions from './actions';
import reducer, { Contact, InitialState } from './reducer';

const mockStore = configureMockStore([thunk]);

describe('contacts reducers', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  it('should return the initial state', () => {
    const reduction = reducer(undefined, {});

    expect(reduction).toEqualImmutable(new InitialState);
  });

  it('should handle CONTACTS_FETCH', () => {
    const reduction = reducer(new InitialState, {
      type: actions.CONTACTS_FETCH
    });

    const imm = new InitialState({
      isFetching : true
    });
    
    expect(reduction).toEqualImmutable(imm);
  });

  it('should handle CONTACTS_FETCH_SUCCESS', () => {
    const reduction = reducer(new InitialState, {
      type: actions.CONTACTS_FETCH_SUCCESS,
      payload : { contacts : [{ id : 1, name : 'Some name' }, { id : 2, name: 'Some other name' }] }
    });

    const imm = new InitialState({
      items : new List([
        new Contact({ id : 1, name : 'Some name'}),
        new Contact({ id : 2, name : 'Some other name'})
      ]),
      isFetching : false
    });
    
    expect(reduction).toEqualImmutable(imm);
  });

  it('should handle CONTACTS_GET_SUCCESS', () => {
    const reduction = reducer(new InitialState({
      items : new List([
        new Contact({ id : 1, name : 'Some name'}),
        new Contact({ id : 2, name : 'Some name'})
      ])
    }), {
      type: actions.CONTACTS_GET_SUCCESS,
      payload :  { "id" : "123", name : 'Some other name' }
    });

    const imm = new InitialState({
      items : new List([
        new Contact({ id : 1, name : 'Some name'}),
        new Contact({ id : 2, name : 'Some name'}),
        new Contact({ id : "123", name : 'Some other name'})
      ]),
      isFetching : false
    });
    
    expect(reduction).toEqualImmutable(imm);
  });

  it('should handle CONTACT_ADD_SUCCESS', () => {
    const reduction = reducer(new InitialState, {
      type: actions.CONTACT_ADD_SUCCESS,
      payload : { name : 'Some name' },
      id : 1
    });

    const imm = new InitialState({
      items : new List([
        new Contact({ id : 1, name : 'Some name'})
      ])
    });
    
    expect(reduction).toEqualImmutable(imm);
  });

  it('should handle CONTACT_UPDATE_SUCCESS', () => {
    const reduction = reducer(new InitialState({
      items : new List([
        new Contact({ id : 1, name : 'Some name'}),
        new Contact({ id : 2, name : 'Some name'}),
        new Contact({ id : 3, name : 'Some name'})
      ])
    }), {
      type: actions.CONTACT_UPDATE_SUCCESS,
      payload : { name : 'Some other name' },
      id : 1
    });

    const imm = new InitialState({
      items : new List([
        new Contact({ id : 1, name : 'Some other name' }),
        new Contact({ id : 2, name : 'Some name'}),
        new Contact({ id : 3, name : 'Some name'})
      ])
    });
    
    expect(reduction).toEqualImmutable(imm);
  });

  it('should handle CONTACT_DELETE_SUCCESS', () => {
    const reduction = reducer(new InitialState({
      items : new List([
        new Contact({ id : 1, name : 'Some name'}),
        new Contact({ id : 2, name : 'Some name'}),
        new Contact({ id : 3, name : 'Some name'})
      ])
    }), {
      type: actions.CONTACT_DELETE_SUCCESS,
      id : 1
    });

    const imm = new InitialState({
      items : new List([
        new Contact({ id : 2, name : 'Some name'}),
        new Contact({ id : 3, name : 'Some name'})
      ])
    });
    
    expect(reduction).toEqualImmutable(imm);
  });
});