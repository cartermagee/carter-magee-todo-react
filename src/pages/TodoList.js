import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Filter from '../components/Filter';
import ListItem from '../components/ListItem';
import Instructions from '../components/Instructions';

const ListItemsContainer = styled.div`
  height: 100%;
  width: 100%;
`;

function TodoList({
  searchTerm = '',
  filteredTodos = [],
  colors = [],
  tags = [],
  deleteTodo,
  toggleChecked,
  updateTodoName,
  confirmUpdateTagName,
  assignAttribute,
  removeAttribute,
  filterByColor,
  filterByTags,
  clearAllFilters,
  todoListRef,
}) {
  return (
    <>
      <Filter
        colors={colors}
        tags={tags}
        filterByColor={filterByColor}
        filterByTags={filterByTags}
        clearAllFilters={clearAllFilters}
      />
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
              tags={tags}
              colors={colors}
              todo={todo}
              deleteTodo={deleteTodo}
              toggleChecked={toggleChecked}
              updateTodoName={updateTodoName}
              confirmUpdateTagName={confirmUpdateTagName}
              assignAttribute={assignAttribute}
              removeAttribute={removeAttribute}
            />
          ))
        )}
        <div ref={todoListRef} />
      </ListItemsContainer>
    </>
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
  colors: PropTypes.arrayOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.string),
  deleteTodo: PropTypes.func.isRequired,
  toggleChecked: PropTypes.func.isRequired,
  confirmUpdateTagName: PropTypes.func.isRequired,
  updateTodoName: PropTypes.func.isRequired,
  assignAttribute: PropTypes.func.isRequired,
  removeAttribute: PropTypes.func.isRequired,
  filterByColor: PropTypes.func.isRequired,
  filterByTags: PropTypes.func.isRequired,
  clearAllFilters: PropTypes.func.isRequired,
  todoListRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

// export default TodoList;

export default memo(
  TodoList,
  (prevProps, nextProps) => prevProps.filteredTodos === nextProps.filteredTodos
);
