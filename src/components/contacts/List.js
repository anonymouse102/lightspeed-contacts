import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { List } from 'immutable';

import { fetchContacts, viewContact, createContact } from './actions';
import View from './View';

class ContactList extends React.Component {
  constructor () {
    super();

    this.searchChange = this.searchChange.bind(this);
  }

  componentDidMount () {
    this.props.fetchContacts();
  }

  searchChange (e) {
    // TODO debounce
    this.props.fetchContacts(e.currentTarget.value);
  }

  render () {
    const { contacts, isFetching, viewContact, selectedContact, creatingContact, createContact } = this.props;

    if (selectedContact !== null) {
      return <View contactId={selectedContact} />;
    } else if (creatingContact) {
      return <View />;
    }

    return (
      <div>
        <button type="button" onClick={() => createContact()}>Create</button>
        <input type="text" onChange={this.searchChange} placeholder="Search" />
        {isFetching ? <div>Loading...</div> : ''}
        {/* Contacts sorted very simply, alphabetically ascending order */}
        {contacts.sort((a, b) => a.name.localeCompare(b.name)).map(contact => (
          <div
            key={contact.id}
            onClick={() => viewContact(contact.id)}>
            {contact.name}
          </div>
        )).toJS()}
      </div>
    );
  }
}

ContactList.propTypes = {
  fetchContacts : PropTypes.func,
  viewContact: PropTypes.func,
  createContact: PropTypes.func,
  isFetching: PropTypes.bool,
  creatingContact: PropTypes.bool,
  contacts: PropTypes.instanceOf(List),
  selectedContact: PropTypes.string
};

export default compose(
  connect(({ contacts : { items, isFetching, selectedContact, creatingContact } }) => ({
    contacts : items,
    isFetching,
    selectedContact,
    creatingContact
  }), {
    fetchContacts,
    viewContact,
    createContact
  })
)(ContactList);