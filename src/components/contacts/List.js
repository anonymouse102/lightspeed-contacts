import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { List } from 'immutable';

import { fetchContacts, viewContact } from './actions';
import View from './View';

class ContactList extends React.Component {
  constructor () {
    super();

    this.state = {
      filter : ''
    };
  }

  componentDidMount () {
    this.props.fetchContacts();
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.filter !== prevState.filter) {
      this.props.fetchContacts(this.state.filter);
    }
  }

  render () {
    const { contacts, isFetching, viewContact, selectedContact } = this.props;

    if (selectedContact !== null) {
      return <View contactId={selectedContact} />;
    }

    return (
      <div>
        <input type="text" onChange={(e) => this.setState({filter:e.currentTarget.value})} placeholder="Search" />
        {isFetching ? <div>Loading...</div> : ''}
        {contacts.map(contact => (
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
  isFetching: PropTypes.bool,
  contacts: PropTypes.instanceOf(List),
  selectedContact: PropTypes.string
};

export default compose(
  connect(({ contacts : { items, isFetching, selectedContact } }) => ({
    contacts : items,
    isFetching,
    selectedContact
  }), {
    fetchContacts,
    viewContact
  })
)(ContactList);