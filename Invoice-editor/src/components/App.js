import React, { Component } from 'react';
import InvoiceList from './InvoiceList'
import logo from '../assets/logo.svg';
import '../css/App.css';

/*Main App Level Component
***Called Components :InvoiceList 
*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Invoice Editor</h2>
        </div>
        <InvoiceList/>  
      </div>
    );
  }
}


export default App;
