import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { media } from './style-utils/media';

import TodoList from './presentational/TodoList';
import DarkModeToggle from './components/DarkModeToggle';
import SearchBar from './components/SearchBar';
import AddTodo from './components/AddTodo';
import { backgroundColor } from './style-utils/theme';
import { sampleData } from './data/sampleData';

const ToDoListContainer = styled.section`
  width: 600px;
  max-height: 80%;
  min-height: 50%;
  border-radius: 1em;
  overflow: scroll;
  background: ${backgroundColor};
  ${media.tablet`
     width: 75%;
   `}
  ${media.phone`
     width: 95%;
    max-height: 100%;
   `}
`;

const ListHeader = styled.header`
  width: 100%;
  background: rgb(52, 58, 64);
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 1;
`;
const ListTitle = styled.h1`
  /* box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.4); */
`;

function App() {
  const initialData = () =>
    JSON.parse(window.localStorage.getItem('todoList')) || sampleData;

  const [todoItems, setTodoItems] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const addNewTodo = (newTodoObj) => {
    setTodoItems([...todoItems, newTodoObj]);
  };

  const deleteTodo = (id) => {
    setTodoItems([...todoItems].filter((item) => item.id !== id));
  };

  const handleChecked = (id, complete) => {
    const todoItemsCopy = [...todoItems];
    for (const item of todoItemsCopy) {
      if (item.id === id) item.complete = !complete;
    }

    setTodoItems(todoItemsCopy);
  };

  // save to localstorage
  const persistLocalData = (todoList) =>
    window.localStorage.setItem('todoList', JSON.stringify(todoList));
  // watch changes in todoItems to call persistLocalStorage to save
  useEffect(() => persistLocalData(todoItems), [todoItems]);

  const handleSearchInput = (event) => setSearchTerm(event.target.value);

  useEffect(() => {
    if (!searchTerm) return setSearchResults([]);
    searchTerm.toLowerCase();
    const filteredTodoItems = [...todoItems].filter(({ name }) =>
      name.toString().toLowerCase().includes(searchTerm)
    );

    setSearchResults(filteredTodoItems);
  }, [searchTerm]);

  return (
    <>
      <DarkModeToggle />
      <ToDoListContainer>
        <ListHeader>
          <ListTitle>Todo List!</ListTitle>
          <SearchBar
            searchTerm={searchTerm}
            handleSearchInput={handleSearchInput}
            searchResults={!!searchResults.length}
          />
        </ListHeader>
        <TodoList
          todoItems={todoItems}
          searchTerm={searchTerm}
          searchResults={searchResults}
          deleteTodo={deleteTodo}
          handleChecked={handleChecked}
        />
        <AddTodo todoItems={!!todoItems.length} addNewTodo={addNewTodo} />
      </ToDoListContainer>
    </>
  );
}

export default App;

/*
  useEffect(
    function updateStatus() {
      document.title = currentList;
    },
    [currentList]
  ); */
