import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { difference } from 'lodash';

import { getContact, viewContact, updateContact, addContact, createContact } from './actions';
import { pickContact, Contact } from './reducer';

const labels = {
  name : 'Name',
  job_title : 'Job Title',
  address : 'Address',
  emails: 'Email Address(es)',
  phone_numbers : 'Phone Number(s)',
  picture_url : 'Picture URL'
};

class Field extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      value : this.props.value
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange (e) {
    const { onChange, name } = this.props;
    const value = e.currentTarget.value;
    const { index } = e.currentTarget.dataset;

    onChange({
      name,
      value,
      index
    });
  }

  componentWillReceiveProps (nextProps) {
    if (
      (Array.isArray(nextProps.value) &&
      difference(nextProps.value, this.props.value).length > 0) ||
      nextProps.value !== this.props.value
    ) {
      this.setState({
        value : nextProps.value
      });
    }
  }

  render () {
    const { name, type = 'text' } = this.props;
    const value = this.state.value;
    const isArray = Array.isArray(value);

    return (
      <div className="input-group">
        {labels[name] && <label>{labels[name]}</label>}
        {isArray ?
          value.map((v, index) =>
            <input
              name={name}
              data-index={index}
              key={`${name}[${index}]`}
              value={v} 
              onChange={this.handleFieldChange}
              type={type}
            />
          ) : //so sad
          <input
            name={name} 
            value={value}
            onChange={this.handleFieldChange}
            type={type}
          />}
      </div>
    );
  }
}

Field.propTypes = {
  name : PropTypes.string.isRequired,
  value : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  type : PropTypes.string,
  onChange : PropTypes.func
};

class ContactView extends React.Component {
  constructor () {
    super();

    this.state = {
      data : new Contact()
    };
    
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount () {
    if (this.props.contactId) {
      this.props.getContact(this.props.contactId);
    }

    if (this.props.contact) {
      this.setState({ data : this.props.contact });
    }
  }

  submitForm () {
    const { viewContact, updateContact, addContact, createContact } = this.props;
    const { id, ...data } = this.state.data.toJS();

    if (id) {
      updateContact(id, data);
    } else {
      addContact(data);
    }

    // ok, this shouldn't be like this... let's make an action that goes "back"
    viewContact(null);
    createContact(false);
  }

  handleFieldChange ({ name, value, index}) {
    if (index) {
      this.setState({
        data : this.state.data.updateIn([name], values => {
          values[index] = value;
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
    const { viewContact, createContact } = this.props;

    return (
      <div>
        <div>
          <a onClick={() => { viewContact(null); createContact(false); }}>Back</a>
        </div>
        {Object.entries(this.state.data._defaultValues).map(([key]) => 
          <Field
            key={key}
            name={key}
            type={key === 'id' ? 'hidden' : 'text'}
            value={this.state.data[key]}
            onChange={this.handleFieldChange}
          /> 
        )}
        <button type="button" onClick={this.submitForm}>Save</button>
      </div>
    );
  }
}

ContactView.propTypes = {
  viewContact: PropTypes.func,
  getContact: PropTypes.func,
  updateContact: PropTypes.func,
  createContact: PropTypes.func,
  addContact: PropTypes.func,
  contactId: PropTypes.string,
  contact: PropTypes.instanceOf(Contact)
};

export default compose(
  connect((state, { contactId }) => ({
    contact : contactId ? pickContact(state, contactId) : null
  }), {
    getContact,
    viewContact,
    updateContact,
    addContact,
    createContact
  })
)(ContactView);