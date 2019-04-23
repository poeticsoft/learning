
// Props and state 
// https://github.com/uberVU/react-guide/blob/master/props-vs-state.md

import React, { Component } from 'react';
import './component.css';

import SubBase from '../subbase/component';

interface IProps {
  prop_a: string,
  prop_b: number
}

interface IState {
  valor: number
}

class Base extends Component<IProps, IState> {

  state: IState;

  constructor(props: IProps) {

    super(props);
    this.state = { valor: this.props.prop_b };
  }

  render() {

    console.log('Base');

    return (
      <div className="Base">
        <h4>Base { this.props.prop_a } { this.state.valor }</h4>
        <SubBase prop_a="A" />
        <SubBase prop_a="B" />
      </div>
    );
  }
}

export default Base;
