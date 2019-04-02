import React from 'react';
import '../App.css';

class Homepage extends React.Component {

  state = {
    types: [],
  };

  getTypes = ()=>{
    fetch("http://localhost:3030/getTypes").then(r => r.json())
      .then(typesData => {
        console.log(typesData.types);
        this.setState({types: typesData.types});
      });
  };

  componentDidMount(){
    this.getTypes();
    console.log(this.state.types);
  };

  render() {
    if(this.state.types.length > 0){
      console.log('in the right callback');
      let data = this.state.types.map((type)=>{
        return (<li className='animalType' key={Math.random()}>{type.name}</li>);
      });
      console.log(data);
      return (
        <div className="App">
          <h1>Animal Facts for Kids</h1>
          <img src="http://whatsonsouthwest.com/wp-content/uploads/2017/08/2017-08-BBC-The-Zoo-logo-small-777x437.jpg" alt="Animals" />
          <ul className='animalTypeList'>
            {data}
          </ul>
        </div>
      );
    }
    else{
      // this.getTypes();
      return (
        <div className="App">
          <h1>Animal Facts for Kids</h1>
          <img src="http://whatsonsouthwest.com/wp-content/uploads/2017/08/2017-08-BBC-The-Zoo-logo-small-777x437.jpg" alt="Animals" />
        </div>
      );
    }
  }
}

export default Homepage;
