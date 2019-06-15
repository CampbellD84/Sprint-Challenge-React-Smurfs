import React, { Component } from 'react';


class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurf: this.props.activeSmurf || {
        name: '',
        age: '',
        height: ''
      }
    };
  }

  componentDidUpdate(prevProps) {
    if(this.props.activeSmurf && prevProps.activeSmurf !== this.props.activeSmurf) {
      this.setState({
        smurf: this.props.activeSmurf
      });
    }
  }

  handleInputChange = e => {
    e.persist();
    let value = e.target.value
    this.setState(prevState => ({
      smurf: {
        ...prevState.smurf,
      [e.target.name]: value 
    }
  }));
  };

  handleSubmit = event => {
    if(this.props.activeSmurf) {
        this.props.updateSmurf(event, this.state.smurf);
    } else {
        this.props.addSmurf(event, this.state.smurf);
    }
    this.setState({
        name: '',
        age: '',
        height: ''
    });
}


  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">Add to the village</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
