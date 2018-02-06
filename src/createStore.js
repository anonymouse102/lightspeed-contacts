import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer as contactReducer } from './components/contacts';

const middleware = [
  thunk
];

const rootReducer = combineReducers({
  contacts: contactReducer
});

export default () => createStore(rootReducer, applyMiddleware(...middleware));
