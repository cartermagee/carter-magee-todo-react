import React, { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Plus } from 'react-feather';
import uid from 'uid';

import { submitButtonColor, textColor } from '../../style-utils/theme';

import { Form, Input } from './Form';

import { GetTab } from '../../helpers/getTab';

const SubmitBtn = styled.button`
  background: ${({ ready }) => (ready ? submitButtonColor : 'transparent')};
  border-bottom-right-radius: 1em;
  border-left: 1px solid rgba(100, 100, 100, 0.2);
  color: ${({ ready }) => (ready ? '#fff' : textColor)};
  cursor: ${({ ready }) => (ready ? 'pointer' : 'not-allowed')};
`;
const AddNewInput = styled(Input)`
  border: ${({ highlight }) => (highlight ? '2px solid red' : 'none')};
  border-bottom-left-radius: 1em;
`;
function AddNew({
  todoItemsLength = 0,
  tagsLength = 0,
  addNewTodo,
  addNewAttribute,
}) {
  const addNewRef = useRef(null);
  const { currentTab } = GetTab();
  const [ready, setReady] = useState(false);
  const [inputText, setInputText] = useState('');
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (
      (currentTab === 0 && !todoItemsLength) ||
      (currentTab === 1 && !tagsLength)
    )
      return setHighlight(true);
    setHighlight(false);
  }, [todoItemsLength, tagsLength, currentTab]);

  useEffect(() => {
    addNewRef.current.focus();
  }, [addNewRef, highlight]);

  // console.log('addNew');

  useEffect(() => {
    if (inputText.length) return setReady(true);
    setReady(false);
  }, [inputText]);

  const handleInput = (event) => setInputText(event.target.value);
  const clearInput = () => setInputText('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentTab === 1) {
      addNewAttribute(inputText, 'tags');
    } else {
      const id = uid();
      const newTodoObj = {
        id,
        color: '',
        checked: false,
        name: inputText,
        tags: [],
      };
      console.log({ newTodoObj });
      addNewTodo(newTodoObj);
    }
    clearInput();
  };

  return (
    <Form onSubmit={handleSubmit} top>
      <AddNewInput
        ref={addNewRef}
        type="text"
        name="new todo"
        id="new-todo-input"
        placeholder={`${
          currentTab === 2
            ? ''
            : `Enter New ${currentTab === 1 ? 'Tag' : 'Todo'}`
        }`}
        onChange={handleInput}
        value={inputText}
        maxLength="50"
        minlength="1"
        onBlur={clearInput}
        highlight={highlight}
        disabled={currentTab === 2}
      />
      <SubmitBtn type="submit" disabled={!ready} ready={ready}>
        <Plus />
      </SubmitBtn>
    </Form>
  );
}

AddNew.propTypes = {
  todoItemsLength: PropTypes.number,
  tagsLength: PropTypes.number,
  addNewTodo: PropTypes.func.isRequired,
  addNewAttribute: PropTypes.func.isRequired,
  addNewRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};
// export default AddNew;
export default memo(
  AddNew,
  (prevProps, nextProps) =>
    prevProps.todoItemsLength === nextProps.todoItemsLength &&
    prevProps.tagsLength === nextProps.tagsLength
);
