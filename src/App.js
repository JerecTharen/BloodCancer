import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {



  render() {
    let data = fetch("http://localhost:3030/getTypes");
    return (
      <div className="App">
        <h1>Animal Facts for Kids</h1>
        <img src="http://whatsonsouthwest.com/wp-content/uploads/2017/08/2017-08-BBC-The-Zoo-logo-small-777x437.jpg" alt="Animal Picture" />
      </div>
    );
  }
}

export default App;
