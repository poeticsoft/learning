import React, { Component } from 'react';
import './App.css';

import Base from './component/base/component';

class App extends Component {

  render() {

    console.log('App');
    
    return (
      <div className="App">
        <h4>APP</h4>
        <Base prop_a={'A'} prop_b={1}/>
        <Base prop_a={'B'} prop_b={2}/>
        <Base prop_a={'C'} prop_b={3}/>
        <Base prop_a={'D'} prop_b={4}/>
      </div>
    );
  }
}

export default App;
