import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Edit2, Save } from 'react-feather';
import { useOnClickOutside } from '../helpers/useOnClickOutside';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  &:hover {
    font-style: normal;
    div {
      visibility: visible;
    }
  }
`;

const EditingContainer = styled.form``;

const EditingInput = styled.input`
  background: transparent;
  color: inherit;
  font-size: inherit;
  padding: 3px;
  text-align: inherit;
  width: 100%;
`;

const Text = styled.span`
  cursor: text;
  font-style: inherit;
  padding: 3px;
`;

const IconContainer = styled.div`
  align-items: center;
  cursor: pointer;
  display: grid;
  justify-items: center;
  margin: 3px;
  visibility: ${({ isEditing }) => (isEditing ? 'visible' : 'hidden')};
`;

function Editable({
  add = false,
  cancelEditing = false,
  small = false,
  text = '',
  type = 'tags' || 'colors',
  addNewAttribute,
  updateFunction,
  toggleNewEmptyTag,
}) {
  const [isEditing, setIsEditing] = useState(add);
  const [value, setValue] = useState(text);
  const [prevValue, setPrevValue] = useState('');

  const inputRef = useRef(null);
  const editableRef = useRef(null);

  const escFunction = useCallback(() => {
    if (add) return toggleNewEmptyTag();
    setValue(prevValue);
    setIsEditing(false);
  }, [add, prevValue, toggleNewEmptyTag]);

  useOnClickOutside(editableRef, () => escFunction());

  useEffect(() => {
    if (isEditing && inputRef && inputRef.current)
      return inputRef.current.focus();
  }, [isEditing, inputRef]);

  useEffect(() => {
    if (cancelEditing) {
      setValue(prevValue);
    }
  }, [cancelEditing, prevValue]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.keyCode === 27 || e.keyCode === 9) {
        setIsEditing(false);
        setValue(prevValue);
      }
    },
    [prevValue]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);
    return () => {
      document.removeEventListener('keydown', handleKeyPress, false);
    };
  }, []);

  const toggleEdit = () => {
    setPrevValue(text);
    setIsEditing(!isEditing);
  };

  const handleEdit = (e) => {
    setValue(e.target.value);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (!value) return setValue(prevValue);
    updateFunction(value, prevValue);
    setIsEditing(false);
  };

  const handleSubmitNew = (e) => {
    e.preventDefault();
    if (value) addNewAttribute(value, type);
    toggleNewEmptyTag();
  };

  return (
    <Container isEditing={isEditing} ref={editableRef}>
      {isEditing || add ? (
        <>
          <EditingContainer onSubmit={add ? handleSubmitNew : handleSubmitEdit}>
            <EditingInput ref={inputRef} value={value} onChange={handleEdit} />
          </EditingContainer>
        </>
      ) : (
        <>
          <Text onClick={toggleEdit}>{text}</Text>
        </>
      )}
      <IconContainer small={small} isEditing={isEditing}>
        {isEditing ? (
          <Save onClick={add ? handleSubmitNew : handleSubmitEdit} />
        ) : (
          <Edit2 onClick={toggleEdit} />
        )}
      </IconContainer>
    </Container>
  );
}

Editable.propTypes = {
  add: PropTypes.bool,
  cancelEditing: PropTypes.bool,
  small: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  addNewAttribute: PropTypes.func,
  updateFunction: PropTypes.func,
  toggleNewEmptyTag: PropTypes.func,
};

export default Editable;
// export default memo(
//   Editable,
//   (prevProps, nextProps) =>
//     prevProps.add === nextProps.add &&
//     prevProps.cancelEditing === nextProps.cancelEditing &&
//     prevProps.small === nextProps.small &&
//     prevProps.text === nextProps.text &&
//     prevProps.type === nextProps.type
// );
