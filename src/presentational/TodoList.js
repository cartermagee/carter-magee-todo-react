import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { useSpring, animated, config } from 'react-spring';
import { ArrowDown } from 'react-feather';
import ListItem from '../components/ListItem';

const ListItemsContainer = styled.div`
  display: grid;
  overflow: scroll;
  grid-auto-rows: 90px;
  height: ${({ todoItems }) => todoItems.length * 100 || '100%'};
`;
const Instructions = styled.span`
  display: grid;
  justify-items: center;
`;
export default function TodoList({ todoItems = {}, deleteTodo }) {
  return (
    <ListItemsContainer todoItems={todoItems}>
      {!todoItems.length ? (
        <Instructions>
          add some todo items below <ArrowDown />
        </Instructions>
      ) : (
        todoItems.map(({ id, ...rest }) => (
          <ListItem key={id} id={id} {...rest} deleteTodo={deleteTodo} />
        ))
      )}
    </ListItemsContainer>
  );
}

TodoList.propTypes = {
  todoItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
      color: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  deleteTodo: PropTypes.func.isRequired,
};
