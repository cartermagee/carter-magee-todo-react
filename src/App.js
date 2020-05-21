import React, { useState } from 'react';
import styled from 'styled-components';
import { media } from './style-utils/media';

import TodoList from './pages/TodoList';
import DarkModeToggle from './components/DarkModeToggle';

import { sampleData } from './data/sampleData';

const ToDoListContainer = styled.section`
  width: 600px;
  max-height: 80%;
  ${media.tablet`
    width: 75%;
   `}
  ${media.phone`
    width: 95%;
    max-height: 100%;
   `}
`;

function App() {
  const [todoItems, setTodoItems] = useState(sampleData);

  return (
    <>
      <DarkModeToggle />
      <ToDoListContainer>
        <h1>Todo List!</h1>
        <TodoList todoItems={todoItems} />
      </ToDoListContainer>
    </>
  );
}

export default App;
