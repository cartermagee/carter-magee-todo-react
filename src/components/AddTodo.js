import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uid from 'uid';
import { Plus } from 'react-feather';
import { submitButtonColor, textColor } from '../style-utils/theme';
import { Form, Input } from './Form';

const SubmitBtn = styled.button`
  background: ${({ ready }) => (ready ? submitButtonColor : 'transparent')};
  border-bottom-right-radius: 1em;
  border-left: 1px solid rgba(100, 100, 100, 0.2);
  color: ${({ ready }) => (ready ? '#fff' : textColor)};
  cursor: ${({ ready }) => (ready ? 'pointer' : 'not-allowed')};
`;
const AddTodoInput = styled(Input)`
  border: ${({ highlight }) => !highlight && '2px solid red'};
  border-bottom-left-radius: 1em;
  &:focus {
    border: none;
  }
`;
export default function AddTodo({ addNewTodo, todoItems }) {
  const [ready, setReady] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    if (newTodo.length && newTodo.length > 0) return setReady(true);
    setReady(false);
    return () => setReady(false);
  }, [newTodo]);

  const handleInput = (event) => setNewTodo(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTodoObj = {
      id: uid(), // this way you could have todos with the same name but different tags or colors
      color: '',
      complete: false,
      name: newTodo,
      tags: [],
    };
    console.log({ newTodoObj });
    addNewTodo(newTodoObj);
    // wait for success
    setNewTodo('');
  };

  return (
    <Form onSubmit={handleSubmit} top>
      <AddTodoInput
        type="text"
        name="new todo"
        id="new-todo-input"
        placeholder="Enter New Todo"
        onChange={handleInput}
        value={newTodo}
        maxLength="50"
        minlength="1"
        highlight={todoItems}
      />
      <SubmitBtn type="submit" disabled={!ready} ready={ready}>
        <Plus />
      </SubmitBtn>
    </Form>
  );
}

AddTodo.propTypes = {
  addNewTodo: PropTypes.func,
  todoItems: PropTypes.bool,
};
