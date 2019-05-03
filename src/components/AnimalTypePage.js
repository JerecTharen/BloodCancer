import React from 'react';

class AnimalTypePage extends React.Component{

  state = {
    type: {},
  }

  getTypes = ()=>{
    fetch(`http://localhost:3030/petapi/${this.props.match.params.path}`).then(r => r.json())
      .then(typesData => {
        console.log('types data is:', typesData);
        console.log(typesData);
        if(typesData){
          this.setState({type: typesData});
        }
      });
  };

  componentDidMount(){
    this.getTypes();
  }

  render(){

    return(
      <h1>Hello There {this.props.match.params.path}</h1>
    )
  }
}

export default AnimalTypePage;
