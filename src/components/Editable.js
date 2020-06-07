import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Edit2, Save } from 'react-feather';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  text-decoration: ${({ isEditing }) => (isEditing ? 'underline' : 'inherit')};
  &:hover {
    font-style: normal;
    /* text-decoration: underline; */
    div {
      /* display: block; */
      visibility: visible;
    }
  }
`;

const EditingContainer = styled.form``;

const EditingInput = styled.input`
  background: transparent;
  color: inherit;
  font-size: inherit;
  text-align: inherit;
  width: 100%;
  &:focus {
    /* text-decoration: underline; */
  }
`;

const Text = styled.span`
  cursor: text;
  font-style: inherit;
`;

const IconContainer = styled.div`
  cursor: pointer;
  visibility: ${({ isEditing }) => (isEditing ? 'visible' : 'hidden')};
  /* display: ${({ isEditing }) => (isEditing ? 'block' : 'none')}; */
  /* height: 24px; */
  margin: 0 3px;
  /* width: 24px; */
  display: grid;
  align-items: center;
`;

export default function Editable({ cancelEditing, text, saveFunction }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);
  const [prevValue, setPrevValue] = useState('');

  const inputRef = useRef();

  useEffect(() => {
    if (isEditing && inputRef && inputRef.current)
      return inputRef.current.focus();
  }, [isEditing, inputRef]);

  useEffect(() => {
    if (cancelEditing) {
      setValue(prevValue);
    }
  }, [cancelEditing, prevValue]);

  const escFunction = useCallback(
    (e) => {
      if (e.keyCode === 27 || e.keyCode === 9) {
        setIsEditing(false);
        setValue(prevValue);
      }
    },
    [prevValue]
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  });

  const toggleEdit = () => {
    setPrevValue(text);
    setIsEditing(!isEditing);
  };

  const handleEdit = (e) => {
    setValue(e.target.value);
  };
  const handleBlur = () => {
    setValue(prevValue);
    toggleEdit();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return setValue(prevValue);
    saveFunction(value, prevValue);
    setIsEditing(false);
  };
  return (
    <Container isEditing={isEditing}>
      {isEditing ? (
        <>
          <EditingContainer onSubmit={handleSubmit}>
            <EditingInput
              ref={inputRef}
              value={value}
              onChange={handleEdit}
              size={value.length + 1}
              onBlur={handleBlur}
            />
          </EditingContainer>
        </>
      ) : (
        <>
          <Text onClick={toggleEdit}>{text}</Text>
        </>
      )}
      <IconContainer isEditing={isEditing} onClick={toggleEdit}>
        {isEditing ? <Save /> : <Edit2 />}
      </IconContainer>
    </Container>
  );
}

Editable.propTypes = {
  cancelEditing: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  saveFunction: PropTypes.func.isRequired,
};
