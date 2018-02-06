import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { getContact } from './actions';
import { pickContact, Contact } from './reducer';

class ContactView extends React.Component {
  constructor () {
    super();

    this.state = {
      data : new Contact()
    };
    
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentDidMount () {
    if (this.props.contactId) {
      this.props.getContact(this.props.contactId);
    }

    if (this.props.contact) {
      this.setState({ data : this.props.contact });
    }
  }

  componentWillReceiveProps () {
    // console.log(this.props);
  }

  handleFieldChange (e) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    const { key } = e.currentTarget.dataset;

    if (key) {
      this.setState({
        data : this.state.data.updateIn([name], values => {
          values[key] = value;
          return values;
        })
      });
    } else {
      this.setState({
        data : this.state.data.set(name, value)
      });
    }
  }

  render () {
    return (
      <div>
        {Object.entries(this.state.data._defaultValues).map(([key]) => {
          const value = this.state.data[key];
          return Array.isArray(value) ?
            value.map((v, k) => <input name={key} data-key={k} key={key} value={v} onChange={this.handleFieldChange} />) :
            <input name={key} key={key} value={value} onChange={this.handleFieldChange} />;
        })}
      </div>
    );
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