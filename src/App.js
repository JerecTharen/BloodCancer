import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route,} from "react-router-dom";

//Components
import Homepage from './components/Homepage';
import AnimalTypePage from './components/AnimalTypePage';

class App extends Component {

  render() {
    return (
      <Router>
        <Route exact path='/' render={({match, history})=> <Homepage history={history}  match={match} />} />
        <Route path='/animalType/:path' render={({match, history})=> <AnimalTypePage history={history}  match={match} />} />
      </Router>
    )
  }
}

export default App;
