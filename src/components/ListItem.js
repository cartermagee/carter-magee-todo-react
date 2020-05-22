import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CheckSquare, Square, X, Tag } from 'react-feather';
import {
  textColor,
  itemBackground,
  itemBackgroundHover,
} from '../style-utils/theme';

const ListItemContainer = styled.div`
  align-items: center;
  background: ${itemBackground};
  color: ${textColor};
  cursor: grab;
  display: grid;
  font-weight: 500;
  font-size: 20px;
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
  background: none;
  color: ${textColor};
`;
const Task = styled.p`
  cursor: text;
  font-style: ${({ complete }) => complete && 'italic'};
  text-decoration: ${({ complete }) => complete && 'line-through'};
  width: fit-content;
  &:hover {
    text-decoration: underline;
  }
`;

const OptionsContainer = styled.div`
  align-items: center;
  display: grid;
  height: 90%;
  justify-items: center;
  width: 50px;
  justify-self: center;
  & > * {
    display: grid;
    justify-items: center;
    align-items: center;
    border-radius: 5px;
    width: 100%;
    color: ${textColor};
    background: inherit;
    &:hover {
      filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.5));
    }
  }
`;
const OptionsBtn = styled.button.attrs({
  type: 'button',
})``;
const ColorIndicator = styled.div`
  width: 30px;
  height: 20px;
  border-radius: inherit;
  background: ${({ color }) => color || 'none'};
  border: 1px solid ${({ color }) => (color ? 'transparent' : textColor)};
  font-size: 8px;
  display: grid;
  justify-items: center;
  align-items: center;
`;
export default function ListItem({
  name = '',
  complete,
  color = {},
  id = '',
  tags = {},
  deleteTodo,
  handleChecked,
}) {
  const confirmDelete = () => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      console.log(`deleting: ${name}`);
      deleteTodo(id);
    }
  };
  const handleCheck = () => {
    handleChecked(id, complete);
  };

  return (
    <ListItemContainer>
      <Checkbox onClick={handleCheck}>
        {complete ? <CheckSquare /> : <Square />}
      </Checkbox>
      <span>
        <Task complete={complete}>{name}</Task>
      </span>
      <OptionsContainer>
        <OptionsBtn onClick={confirmDelete}>
          <X />
        </OptionsBtn>
        <OptionsBtn>
          <ColorIndicator color={color}>{!color && <>(none)</>}</ColorIndicator>
        </OptionsBtn>
        <OptionsBtn>
          <Tag />
        </OptionsBtn>
      </OptionsContainer>
    </ListItemContainer>
  );
}

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  complete: PropTypes.bool.isRequired,
  color: PropTypes.string,
  id: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  deleteTodo: PropTypes.func,
  handleChecked: PropTypes.func.isRequired,
};
