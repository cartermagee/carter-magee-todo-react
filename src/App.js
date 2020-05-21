import React, { useState } from 'react';
import styled from 'styled-components';
import TodoList from './pages/TodoList';
import { sampleData } from './data/sampleData';
import { media } from './style-utils/media';

const Wrapper = styled.section`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  ${media.desktop`
    align-items: flex-start;
   `}
  margin: 0;
  padding: 0;
  width: 100%;
`;

const ToDoListContainer = styled.section`
  border: 1px solid red;
  width: 600px;
  ${media.tablet`
     width: 75%;
   `}
  ${media.phone`
     width: 95%;
   `}
`;

function App() {
  const [todoItems, setTodoItems] = useState(sampleData);

  return (
    <Wrapper>
      <ToDoListContainer>
        <h1>Todo List!</h1>
        <TodoList todoItems={todoItems} />
      </ToDoListContainer>
    </Wrapper>
  );
}

export default App;
