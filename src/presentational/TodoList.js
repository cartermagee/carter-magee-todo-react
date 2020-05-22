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
  height: ${({ todoItems }) => todoItems.length * 100 || '90px'};
`;
const Instructions = styled.span`
  display: grid;
  justify-items: center;
`;
export default function TodoList({
  todoItems = {},
  searchResults = {},
  searchTerm = '',
  deleteTodo,
  handleChecked,
}) {
  //  I previously had this logic in a hideous nested ternary but I had to break it out into this function because the ternary gave me a rash.
  const renderTodoList = () => {
    if (searchTerm && !searchResults.length)
      return <Instructions>No results!</Instructions>;
    if (!todoItems.length)
      return (
        <Instructions>
          add some todo items below <ArrowDown />
        </Instructions>
      );
    return (searchResults.length
      ? searchResults
      : todoItems
    ).map(({ id, ...rest }) => (
      <ListItem
        key={id}
        id={id}
        {...rest}
        deleteTodo={deleteTodo}
        handleChecked={handleChecked}
      />
    ));
  };

  return (
    <ListItemsContainer
      todoItems={searchResults.length ? searchResults : todoItems}
    >
      {renderTodoList()}
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
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
      color: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  searchTerm: PropTypes.string,
  deleteTodo: PropTypes.func.isRequired,
  handleChecked: PropTypes.func.isRequired,
};

/* GTFO
      {searchTerm && !searchResults.length ? (
        <Instructions>No results!</Instructions>
      ) : !todoItems.length ? (
        <Instructions>
          add some todo items below <ArrowDown />
        </Instructions>
      ) : (
        (searchResults.length
          ? searchResults
          : todoItems
        ).map(({ id, ...rest }) => (
          <ListItem key={id} {...rest} deleteTodo={deleteTodo} />
        ))
      )} */
