import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CheckSquare, Square, X, Tag } from 'react-feather';
import {
  itemBackground,
  itemBackgroundHover,
  textColor,
} from '../style-utils/theme';

import ColorIndicator from './colors/ColorIndicator';
import Editable from './Editable';
import ItemColor from './dropdowns/ItemColor';
import ItemTags from './dropdowns/ItemTags';

import { useOnClickOutside } from '../helpers/useOnClickOutside';
import { useOnEscapeClose } from '../helpers/useOnEscapeClose';

const ListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  z-index: 2;
`;

const ListItemInner = styled.div`
  align-items: center;
  background: ${({ active }) =>
    active ? itemBackgroundHover : itemBackground};
  cursor: grab;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  width: 100%;
  height: 90px;
  z-index: 3;
  &:hover {
    background: ${itemBackgroundHover};
  }
`;

const Checkbox = styled.button.attrs({
  type: 'button',
})`
  align-items: center;
  background: none;
  color: ${textColor};
  display: grid;
  justify-items: center;
`;

const TaskContainer = styled.span`
  display: flex;
  flex-direction: row;
  font-style: ${({ checked }) => checked && 'italic'};
  height: fit-content;
  text-decoration: ${({ checked }) => checked && 'line-through'};
  width: fit-content;
  &:hover {
    text-decoration: none;
  }
`;

const OptionsContainer = styled.div`
  align-items: center;
  display: grid;
  height: 90%;
  justify-items: center;
  justify-self: center;
  z-index: 100;
  & button {
    align-items: center;
    border-radius: 5px;
    color: ${textColor};
    display: grid;
    justify-items: center;
    &:hover {
      filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.5));
    }
  }
`;

const OptionsBtn = styled.button.attrs({
  type: 'button',
})`
  background: inherit;
  width: 100%;
`;

function ListItem({
  todo = {},
  colors = [],
  tags = [],
  deleteTodo,
  toggleChecked,
  updateTodoName,
  confirmUpdateTagName,
  assignAttribute,
  removeAttribute,
}) {
  const { checked = false, name = '', color = '', tags: itemTags = [] } = todo;

  const [openTags, setOpenTags] = useState(false);
  const [openColors, setOpenColors] = useState(false);

  const confirmDelete = () => {
    // if (window.confirm('Are you sure you wish to delete this item?')) {
    //   console.log(`deleting: ${name}`);
    // }
    deleteTodo(todo);
  };

  const handleCheck = () => {
    toggleChecked(todo);
  };

  const handleAssign = (attr, type) => {
    assignAttribute(attr, name, type);
  };

  const handleRemoveAttribute = (attr, type) => {
    removeAttribute(attr, name, type);
  };

  const closeDropdown = () => {
    if (openTags) return setOpenTags(false);
    if (openColors) return setOpenColors(false);
  };

  const toggleOpenTags = () => {
    setOpenTags(!openTags);
  };

  const toggleOpenColors = () => {
    setOpenColors(!openColors);
  };
  const itemRef = useRef();

  useOnClickOutside(itemRef, closeDropdown);
  useOnEscapeClose(closeDropdown);

  return (
    <ListItemContainer>
      <ListItemInner active={openTags}>
        <Checkbox onClick={handleCheck}>
          {checked ? <CheckSquare /> : <Square />}
        </Checkbox>
        <TaskContainer checked={checked}>
          <Editable text={name} updateFunction={updateTodoName} />
        </TaskContainer>
        <OptionsContainer>
          <OptionsBtn onClick={confirmDelete}>
            <X />
          </OptionsBtn>
          <OptionsBtn onClick={() => !openColors && toggleOpenColors()}>
            <ColorIndicator color={color} />
          </OptionsBtn>
          <OptionsBtn onClick={() => !openTags && toggleOpenTags()}>
            <Tag />
          </OptionsBtn>
        </OptionsContainer>
      </ListItemInner>
      <div ref={itemRef}>
        <ItemTags
          open={openTags}
          itemTags={itemTags}
          tags={tags}
          toggle={toggleOpenTags}
          confirmUpdateTagName={confirmUpdateTagName}
          handleAssign={handleAssign}
          handleRemoveAttribute={handleRemoveAttribute}
        />
        <ItemColor
          open={openColors}
          itemColor={color}
          colors={colors}
          toggle={toggleOpenColors}
          confirmUpdateTagName={confirmUpdateTagName}
          handleAssign={handleAssign}
          handleRemoveAttribute={handleRemoveAttribute}
        />
      </div>
    </ListItemContainer>
  );
}

ListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    color: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.string),
  deleteTodo: PropTypes.func.isRequired,
  toggleChecked: PropTypes.func.isRequired,
  updateTodoName: PropTypes.func.isRequired,
  confirmUpdateTagName: PropTypes.func.isRequired,
  assignAttribute: PropTypes.func.isRequired,
  removeAttribute: PropTypes.func.isRequired,
};

export default ListItem;
// export default memo(
//   ListItem,
//   (prevProps, nextProps) =>
//     prevProps.todo.checked === nextProps.todo.checked &&
//     prevProps.todoItems === nextProps.todoItems
// );
