import React, { useState, useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';

import styled from 'styled-components';
import { media } from './style-utils/media';
import { backgroundColor, dropShadow } from './style-utils/theme';

import Transition from './components/transitions/RouteTransitions';
import DarkModeToggle from './components/transitions/DarkModeToggle';

import Editable from './components/Editable';

import Nav from './components/nav/Nav';

import AddNew from './components/form-elements/AddNew';
import SearchBar from './components/form-elements/SearchBar';

import Dialog from './components/Dialog';

import { ListHeader, ListTitle } from './components/header/header-containers';

import TodoList from './pages/TodoList';
import Tags from './pages/Tags';
import Colors from './pages/Colors';

import { sampleTodoList, sampleTags } from './data/sampleData';
// import { GetTab } from './helpers/getTab';

const ToDoListContainer = styled.section`
  background: ${backgroundColor};
  border-radius: 1em;
  display: grid;
  filter: ${dropShadow};
  grid-template-rows: 210px auto 90px;
  height: 80vh;
  overflow: hidden;
  width: 600px;
  position: fixed;
  top: 10vh;
  ${media.tablet`
    width: 75%;
    top: 5vh;
   `}
  ${media.phone`
    width: 95%;
    max-height: 100%;
    top: 1vh;
   `}
`;

function App() {
  const initialListItems = () =>
    JSON.parse(window.localStorage.getItem('listItems')) || sampleTodoList;
  const initialTags = () =>
    JSON.parse(window.localStorage.getItem('tagsArray')) || sampleTags;
  const initialTitle = () =>
    JSON.parse(window.localStorage.getItem('title')) || 'New Todo List!';

  const [showDialog, setShowDialog] = useState(false);
  const [dialogObj, setDialogObj] = useState({});
  const [cancelEditing, setCancelEditing] = useState(false);

  const [todoItems, setTodoItems] = useState(initialListItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [tags, setTags] = useState(initialTags);
  const [todoListTitle, setTodoListTitle] = useState(initialTitle);

  // save to localstorage
  const persistLocalData = (keyString, stateObject) =>
    window.localStorage.setItem(keyString, JSON.stringify(stateObject));

  // watch changes in todoItems to call persistLocalStorage to save

  useEffect(() => {
    persistLocalData('tags', tags);
  }, [tags]);

  useEffect(() => {
    persistLocalData('listItems', todoItems);
  }, [todoItems]);

  useEffect(() => {
    persistLocalData('title', todoListTitle);
    document.title = todoListTitle;
    return () => (document.title = 'TooDoOOO!');
  }, [todoListTitle]);

  // console.log({ tags });
  const addNewRef = useRef(null);
  const closeDialog = () => {
    setShowDialog(false);
  };

  const addNewTodo = (newTodoObj) => {
    console.log(`adding new todo item: ${newTodoObj.name}`);
    setTodoItems([...todoItems, newTodoObj]);
  };

  const deleteTodo = (todo) => {
    setTodoItems([...todoItems].filter((item) => item !== todo));
  };

  const addNewTag = (newTag) => {
    const tagsSet = new Set([...tags]);
    if (!tagsSet.has(newTag)) {
      tagsSet.add(newTag);
      setTags([...tagsSet]);
    } else {
      alert(`a tag named ${newTag} already exists!`);
    }
  };

  const deleteTag = (tagToDelete) => {
    setTags([...tags].filter((tag) => tag !== tagToDelete));
  };

  const toggleChecked = (todo) => {
    const checked = !todo.checked;
    setTodoItems((prevObjs) =>
      prevObjs.map((o) => {
        if (o === todo) return { ...o, checked };
        return o;
      })
    );
  };

  const updateTodoListTitle = (newTitle) => setTodoListTitle(newTitle);

  const updateTodoName = (name, oldName) => {
    console.log({ name, oldName });

    setTodoItems((prevObjs) =>
      prevObjs.map((todo) => {
        if (todo.name === oldName) return { ...todo, name };
        return todo;
      })
    );
  };

  const applyTagName = (tagName, oldTagName, unused) => {
    const tagsCopy = [...tags];
    const i = tagsCopy.indexOf(oldTagName);
    tagsCopy[i] = tagName;
    console.log('applyTagName', { tagName, oldTagName, i });
    setTags(tagsCopy);
    if (unused) return;
    setTodoItems((prevObjs) =>
      prevObjs.map((todo) => {
        const index = todo.tags.indexOf(oldTagName);
        if (index > -1) {
          const todoCopy = { ...todo };
          todoCopy.tags[index] = tagName;
          return todoCopy;
        }
        return todo;
      })
    );
  };

  const cancelEditTag = () => {
    setCancelEditing(true);
    closeDialog();
  };

  const confirmUpdateTagName = (tagName, oldTagName) => {
    setCancelEditing(false);
    const itemsUsingTag = [...todoItems].filter((item) =>
      item.tags.includes(oldTagName)
    );
    if (itemsUsingTag.length > 0) {
      const text = `This Tag is currently assigned to:\n${itemsUsingTag.map(
        ({ name }) => `\n * ${name.toUpperCase()}`
      )} \n \n Would you like to apply the new tag name to those items, create a new tag instead, or disregard?`;

      setDialogObj({
        text,
        buttons: [
          {
            btnTxt: 'apply to all',
            callback: () => applyTagName(tagName, oldTagName),
          },
          {
            btnTxt: 'create new',
            callback: () => addNewTag(tagName),
          },
          {
            btnTxt: 'cancel',
            callback: cancelEditTag,
          },
        ],
      });
      setShowDialog(true);
    } else {
      applyTagName(tagName, oldTagName, true);
    }
    console.log({ itemsUsingTag });
  };

  const handleSearchInput = (event) => setSearchTerm(event.target.value);
  const clearInput = () => setSearchTerm('');

  useEffect(() => {
    if (!searchTerm) return setFilteredTodos([...todoItems]);
    console.log('in');

    searchTerm.toLowerCase();
    const filteredTodoItems = [...todoItems].filter(({ name }) =>
      name.toString().toLowerCase().includes(searchTerm)
    );
    setFilteredTodos(filteredTodoItems);
  }, [searchTerm, todoItems]);

  return (
    <>
      {showDialog && (
        <Dialog
          showDialog={showDialog}
          dialogObj={dialogObj}
          closeDialog={closeDialog}
        />
      )}
      <DarkModeToggle />
      <ToDoListContainer>
        <ListHeader>
          <ListTitle>
            <Editable
              cancelEditing={cancelEditing}
              text={todoListTitle}
              saveFunction={updateTodoListTitle}
            />
          </ListTitle>
          <Nav />
          <SearchBar
            searchTerm={searchTerm}
            handleSearchInput={handleSearchInput}
            clearInput={clearInput}
          />
        </ListHeader>
        <Transition>
          <Route
            path="/"
            render={() => (
              <TodoList
                searchTerm={searchTerm}
                filteredTodos={filteredTodos}
                // deleteTag={deleteTag}
                deleteTodo={deleteTodo}
                toggleChecked={toggleChecked}
                updateTodoName={updateTodoName}
              />
            )}
            exact
          />
          <Route
            path="/tags"
            render={() => (
              <Tags
                tags={tags}
                deleteTag={deleteTag}
                addNewRef={addNewRef}
                confirmUpdateTagName={confirmUpdateTagName}
                cancelEditing={cancelEditing}
              />
            )}
          />
          <Route path="/colors" render={() => <Colors />} />
          {/* <Route component={NotFound} /> */}
        </Transition>
        <AddNew
          tagsLength={tags.length}
          todoItemsLength={todoItems.length}
          addNewTodo={addNewTodo}
          addNewTag={addNewTag}
          addNewRef={addNewRef}
        />
      </ToDoListContainer>
    </>
  );
}

export default App;
