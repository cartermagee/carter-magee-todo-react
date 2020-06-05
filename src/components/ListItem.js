import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CheckSquare, Square, X, Tag } from 'react-feather';

import Editable from './Editable';

import {
  itemBackground,
  itemBackgroundHover,
  textColor,
} from '../style-utils/theme';
// import ItemTags from './ItemTags';

const ListItemContainer = styled.div`
  cursor: grab;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const ListItemInner = styled.div`
  align-items: center;
  background: ${itemBackground};
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  height: 90px;
  width: 100%;
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
  width: 50px;
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
  width: 100%;
  background: inherit;
`;

const ColorIndicator = styled.div`
  align-items: center;
  background: ${({ color }) => color || 'none'};
  border: 1px solid ${({ color }) => (color ? 'transparent' : textColor)};
  border-radius: inherit;
  display: grid;
  font-size: 8px;
  height: 20px;
  justify-items: center;
  width: 30px;
`;
function ListItem({ todo = {}, deleteTodo, toggleChecked, updateTodoName }) {
  const {
    checked = false,
    id = '' || 0,
    name = '',
    color = '',
    tags = [],
  } = todo;

  const [openTags, setOpenTags] = useState(false);

  const confirmDelete = () => {
    // if (window.confirm('Are you sure you wish to delete this item?')) {
    //   console.log(`deleting: ${name}`);
    // }
    deleteTodo(todo);
  };

  const handleCheck = () => {
    toggleChecked(todo);
  };

  const toggleOpenTags = () => {
    setOpenTags(!openTags);
  };
  return (
    <ListItemContainer>
      <ListItemInner>
        <Checkbox onClick={handleCheck}>
          {checked ? <CheckSquare /> : <Square />}
        </Checkbox>
        <TaskContainer checked={checked}>
          <Editable text={name} saveFunction={updateTodoName} />
        </TaskContainer>
        <OptionsContainer>
          <OptionsBtn onClick={confirmDelete}>
            <X />
          </OptionsBtn>
          <OptionsBtn>
            <ColorIndicator color={color}>
              {!color && <>(none)</>}
            </ColorIndicator>
          </OptionsBtn>
          <OptionsBtn onClick={toggleOpenTags}>
            <Tag />
          </OptionsBtn>
        </OptionsContainer>
      </ListItemInner>
      {/* <ItemTags
        open={openTags}
        tags={tags}
        toggle={toggleOpenTags}
        deleteTag={deleteTag}
      /> */}
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
  deleteTodo: PropTypes.func,
  toggleChecked: PropTypes.func.isRequired,
  updateTodoName: PropTypes.func.isRequired,
};

export default ListItem;
// export default memo(
//   ListItem,
//   (prevProps, nextProps) =>
//     prevProps.todo.checked === nextProps.todo.checked &&
//     prevProps.todoItems === nextProps.todoItems
// );
