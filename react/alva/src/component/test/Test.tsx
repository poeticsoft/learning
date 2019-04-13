
import * as React from 'react';
import './Test.css';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

// helpers

function getExclamationMarks(numChars: number) {

    return Array(numChars + 1).join('!');
}

function Test({ name, enthusiasmLevel = 1 }: Props) {

  if (enthusiasmLevel <= 0) {

    throw new Error('You could be a little more enthusiastic. :D');
  }

  return (
    <div className="Test">
      <div className="greeting">
        Test {name + getExclamationMarks(enthusiasmLevel)}
      </div>
    </div>
  );
}

export default Test;