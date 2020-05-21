import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { useSpring, animated, config } from 'react-spring';
import ListItem from '../components/ListItem';

const ListItemsContainer = styled.div`
  display: grid;
  overflow: scroll;
`;

export default function TodoList({ todoItems }) {
  return (
    <ListItemsContainer style={{ height: todoItems.length * 100 }}>
      {todoItems.map(({ id, ...rest }) => (
        <ListItem key={id} {...rest} />
      ))}
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
  ).isRequired,
};
