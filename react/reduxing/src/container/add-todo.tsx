
import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

let AddTodo: any = ({ dispatch }) => {

  let input;

  return (
    <div>
      <form
        onSubmit = {e => {

          e.preventDefault();

          if (!input.value.trim()) {

            input.focus();            
            return;
          }

          dispatch(addTodo(input.value));

          input.value = '';
          input.focus();
        }}
      >
        <input 
          ref = {node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

AddTodo = connect()(AddTodo)

export default AddTodo