import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ListItem from '../components/ListItem';
import Instructions from '../components/Instructions';

const ListItemsContainer = styled.div`
  align-items: start;
  display: grid;
  grid-auto-flow: dense;
  grid-column: 1/-1;
  grid-gap: 5px;
  grid-template-rows: repeat(auto-fill, minmax(90px, 1fr));
  width: 100%;
`;

function TodoList({
  searchTerm = '',
  filteredTodos = [],
  deleteTodo,
  toggleChecked,
  // removeTag,
  updateTodoName,
}) {
  console.log({ filteredTodos });

  return (
    <ListItemsContainer filteredTodos={filteredTodos}>
      {!filteredTodos.length ? (
        <Instructions
          text={searchTerm ? 'No Results!' : 'add some todo items below '}
          add={!searchTerm}
        />
      ) : (
        filteredTodos.map((todo) => (
          <ListItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleChecked={toggleChecked}
            // removeTag={removeTag}
            updateTodoName={updateTodoName}
          />
        ))
      )}
    </ListItemsContainer>
  );
}

TodoList.propTypes = {
  searchTerm: PropTypes.string,
  filteredTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
      color: PropTypes.string,
      tags: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      ),
    })
  ),
  deleteTodo: PropTypes.func.isRequired,
  toggleChecked: PropTypes.func.isRequired,
  // removeTag: PropTypes.func.isRequired,
  updateTodoName: PropTypes.func.isRequired,
};

export default TodoList;

// export default memo(
//   TodoList,
//   (prevProps, nextProps) => prevProps.filteredTodos === nextProps.filteredTodos
// );
