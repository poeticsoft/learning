
import React, { Component } from 'react';
import './style.scss';

interface IProps {
  main: any
}

class App extends Component<IProps> {

  render() {

    return (
      <div className="App">
        <div className="State">
          <span className={ `Reset ${this.props.main.reset ? 'Active' : ''}` }></span>
          <span className="Reason">{ this.props.main.reason }</span>
        </div> 
        <div className="Content">
        </div>
      </div>
    );
  }
}

export default App;
