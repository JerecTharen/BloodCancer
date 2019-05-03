import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import '../App.css';

class Homepage extends React.Component {

  state = {
    types: [],
  };

  getTypes = ()=>{
    fetch("http://localhost:3030/getTypes").then(r => r.json())
      .then(typesData => {
        console.log('types data is:', typesData);
        console.log(typesData.types);
        if(typesData.types){
          this.setState({types: typesData.types});
        }
      });
  };

  componentDidMount(){
    this.getTypes();
    console.log(this.state.types);
  };

  goToType = (path)=>{
    return ()=>{
      this.props.history.push(`/animalType/${path}`);
    };
  };

  render() {
    if(this.state.types.length > 0){
      console.log('in the right callback');
      let data = this.state.types.map((type)=>{
        let path ='';
        let pathSplit = type._links.self.href.split('/');
        pathSplit.forEach((urlParam)=>{
          path += `${urlParam}-`;
          console.log(path);
        });
        // console.log(typeof(type._links.self));
        return (<li onClick={this.goToType(path)} className='animalType' key={type.name}>{type.name}</li>);
      });
      console.log('data is:', data);
      return (
        <div className="App">
          <h1>Animal Facts for Kids</h1>
          <img src="http://whatsonsouthwest.com/wp-content/uploads/2017/08/2017-08-BBC-The-Zoo-logo-small-777x437.jpg" alt="Animals" />
          <div className='animalTypeList'>
            {data}
          </div>
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
