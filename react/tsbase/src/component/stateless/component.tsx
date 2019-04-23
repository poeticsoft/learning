
import React, { Component } from 'react';
import './component.css';

interface IProps {
  prop_a: number
}

class Stateless extends Component<IProps> {

  constructor(props: IProps) {

    super(props);
  }

  render() {

    return (
      <div className="Stateless">
        <h4>Stateless { this.props.prop_a } </h4>
        <input  />
      </div>
    );
  }
}

export default Stateless;
