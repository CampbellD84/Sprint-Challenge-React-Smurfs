import React, { Component } from 'react';
import Axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      activeSmurf: null
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    Axios.get('http://localhost:3333/smurfs')
    .then(res => this.setState({
      smurfs: res.data
    }))
    .catch(err => console.log(err));
  }


  addSmurf = (event, smurf) => {
    event.preventDefault();
    // add code to create the smurf using the api
    Axios.post('http://localhost:3333/smurfs', smurf)
    .then(res => {
      this.setState({
      smurfs: res.data
    });
    this.props.history.push("/");
  })
    .catch(err => console.log(err));
  }


  render() {
    return (
      <div className="App">
        <nav>
          <h1>Build a Smurf Village</h1>
          <div className="links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/smurf-form">
              {`${this.state.activeSmurf ? "Update" : "Add"} Smurf`}
            </NavLink>
          </div>
        </nav>
        <Route exact path="/" render={props => <Smurfs {...props} smurfs={this.state.smurfs} />} />
        <Route 
          path="/smurf-form" 
          render={props => 
          <SmurfForm 
              {...props}
              smurfs={this.state.smurfs}
              activeSmurf={this.state.activeSmurf}
              addSmurf={this.addSmurf}
            />
          } 
        />
      </div>
    );
  }
}

export default App;
