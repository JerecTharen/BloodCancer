import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link,} from "react-router-dom";

//Components
import Homepage from './components/Homepage';

{/*<Route path='/' exact render={({history})=> <ProductList productRedirect={this.productRedirect} history={history} />} />*/}
{/*<Route path='/cart' render={({history})=> <Cart productRedirect={this.productRedirect} history={history} />} />*/}
{/*<Route path='/product/:productId' component={ProductDisplay} />*/}

class App extends Component {

  render() {
    return (
      <Router>
        <Route exact path='/' component={Homepage} />
        {/*<Route path='/animalType' component={ProductDisplay} />*/}
      </Router>
    )
  }
}

export default App;
