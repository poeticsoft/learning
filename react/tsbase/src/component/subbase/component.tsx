
import React, { Component } from 'react';
import './component.css';

import Stateless from '../stateless/component';

interface IProps {
  prop_a: string
}

interface IState {
  valor: number,
  name?: string
}

class SubBase extends Component<IProps, IState> {

  state: IState;
  handleOnClick: any;
  handleOnChange: any;

  constructor(props: IProps) {

    super(props);
    this.state = { valor: 0 };

    this.handleOnClick = this.changeValue.bind(this); 
    this.handleOnChange = this.changeName.bind(this); 
  }

  changeValue(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    
    this.state.valor++;
    this.setState({ valor: this.state.valor });
  }  

  changeName(event: React.ChangeEvent<HTMLInputElement>) : void {

    this.setState({ name: event.target.value });
  }

  render() {

    console.log('Subbase');


    return (
      <div className="SubBase">
        <h4>Sub Base { this.props.prop_a } { this.state.valor } { this.state.name }</h4> 
        <button onClick = { this.handleOnClick } >UPDATE</button>
        <input onChange={ this.handleOnChange } />
        <Stateless prop_a={this.state.valor} />
      </div>
    );
  }
}

export default SubBase;
