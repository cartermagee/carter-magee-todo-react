import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import clamp from 'lodash-es/clamp';
import swap from 'lodash-move';
// import './style.css';

import { useDrag } from 'react-use-gesture';
import { useSprings, animated, interpolate } from 'react-spring';

import Filter from '../components/Filter';
import ListItem from '../components/ListItem';
import Instructions from '../components/Instructions';

const ListItemsContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  height: ${({ height }) => `${height}px` || '100%'};
  & > div {
    position: absolute;
    width: 100%;
    height: 90px;
    overflow: visible;
    pointer-events: none;
    transform-origin: 50% 50% 0px;
    &.active {
      z-index: 1;
    }
  }
`;
// Returns fitting styles for dragged/idle items
const fn = (order, down, originalIndex, curIndex, y) => (index) =>
  down && index === originalIndex
    ? {
        y: curIndex * 100 + y,
        scale: 1.1,
        // zIndex: '1',
        shadow: 15,
        immediate: (n) => n === 'y' || n === 'zIndex',
      }
    : {
        y: order.indexOf(index) * 90,
        scale: 1,
        // zIndex: '0',
        shadow: 1,
        immediate: false,
      };

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
  reorderList,
  todoListRef,
}) {
  const [active, setActive] = useState(0);

  // const draggableRef = useRef(null);
  const order = useRef(filteredTodos.map((_, index) => index)); // Store indicies as a local ref, this represents the item order
  // console.log(order.current);

  const [springs, setSprings] = useSprings(
    filteredTodos.length,
    fn(order.current)
  ); // Create springs, each corresponds to an item, controlling its transform, scale, etc.

  useEffect(
    () => () => {
      reorderList(order.current);
    },
    []
  ); // set new list order on unmount, empty array as second arguement

  const bind = useDrag(
    ({ args: [originalIndex], down, movement: [, y], ...rest }) => {
      setActive(originalIndex);
      const curIndex = order.current.indexOf(originalIndex);
      const curRow = clamp(
        Math.round((curIndex * 90 + y) / 90),
        0,
        filteredTodos.length - 1
      );
      const newOrder = swap(order.current, curIndex, curRow);
      // setOrderState(newOrder);
      setSprings(fn(newOrder, down, originalIndex, curIndex, y)); // Feed springs new style data, they'll animate the view without causing a single render
      if (!down) {
        order.current = newOrder;
      }
    },
    { filterTaps: true }
  );
  return (
    <>
      <Filter
        colors={colors}
        tags={tags}
        filterByColor={filterByColor}
        filterByTags={filterByTags}
        clearAllFilters={clearAllFilters}
      />
      <ListItemsContainer
        ref={todoListRef}
        className="content"
        filteredTodos={filteredTodos}
        height={filteredTodos.length * 90}
      >
        {!filteredTodos.length ? (
          <Instructions
            text={searchTerm ? 'No Results!' : 'add some todo items below '}
            add={!searchTerm}
          />
        ) : (
          springs.map(({ zIndex, shadow, y, scale }, i) => (
            <animated.div
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...bind(i)}
              key={i}
              className={active === i ? 'active' : ''}
              style={{
                zIndex,
                boxShadow: shadow.interpolate(
                  (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
                ),
                transform: interpolate(
                  [y, scale],
                  (y, s) => `translate3d(0,${y}px,0) scale(${s})`
                ),
              }}
            >
              <ListItem
                tags={tags}
                colors={colors}
                todo={filteredTodos[i]}
                deleteTodo={deleteTodo}
                toggleChecked={toggleChecked}
                updateTodoName={updateTodoName}
                confirmUpdateTagName={confirmUpdateTagName}
                assignAttribute={assignAttribute}
                removeAttribute={removeAttribute}
              />
            </animated.div>
          ))
        )}
        {/* <div  /> */}
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
  reorderList: PropTypes.func.isRequired,
  todoListRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

export default TodoList;

// export default memo(
//   TodoList,
//   (prevProps, nextProps) => prevProps.filteredTodos === nextProps.filteredTodos
// );
