import React  from 'react';
import PropTypes from 'prop-types';
import './App.css';

import ContactList from './components/contacts/List';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ContactList {...this.props} />
      </div>
    );
  }
}

App.contextTypes = {
  store: PropTypes.object.isRequired
};

export default App;
