import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { getContact } from './actions';
import { pickContact, Contact } from './reducer';

class ContactView extends React.Component {
  componentDidMount () {
    if (this.props.contactId) {
      this.props.getContact(this.props.contactId);
    }
  }

  render () {
    console.log(this.props.contact);
    
    return null;
  }
}

ContactView.propTypes = {
  getContact : PropTypes.func,
  contactId: PropTypes.string,
  contact: PropTypes.instanceOf(Contact)
};

export default compose(
  connect((state, { contactId }) => ({
    contact : contactId ? pickContact(state, contactId) : null
  }), {
    getContact
  })
)(ContactView);