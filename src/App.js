import React, { useState, useEffect, useRef, useCallback } from 'react';
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

import { sampleTodoList, sampleTags, sampleColors } from './data/sampleData';
import { scrollToBottom } from './helpers/scrollToBottom';

const ToDoListContainer = styled.section`
  background: ${backgroundColor};
  border-radius: 1em;
  display: grid;
  filter: ${dropShadow};
  grid-template-rows: 210px auto 90px;
  height: 80vh;
  overflow: hidden;
  position: fixed;
  top: 10vh;
  width: 600px;
  ${media.tablet`
    top: 5vh;
    width: 75%;
   `}
  ${media.phone`
    max-height: 100%;
    top: 1vh;
    width: 95%;
   `}
`;

function App() {
  const todoListRef = useRef(null);
  const initialTitle = () =>
    JSON.parse(window.localStorage.getItem('title')) || 'New Todo List!';

  const initialTodoItems = () =>
    JSON.parse(window.localStorage.getItem('TodoItems')) || sampleTodoList;

  const initialTags = () =>
    JSON.parse(window.localStorage.getItem('tags')) || sampleTags;

  const initialColors = () =>
    JSON.parse(window.localStorage.getItem('colors')) || sampleColors;

  const [showDialog, setShowDialog] = useState(false);
  const [dialogObj, setDialogObj] = useState({});
  const [cancelEditing, setCancelEditing] = useState(false);

  const [todoItems, setTodoItems] = useState(initialTodoItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(todoItems);
  const [tags, setTags] = useState(initialTags);
  const [colors, setColors] = useState(initialColors);
  const [todoListTitle, setTodoListTitle] = useState(initialTitle);

  // save to localstorage
  const persistLocalData = (keyString, stateObject) =>
    window.localStorage.setItem(keyString, JSON.stringify(stateObject));

  // listen for changes
  useEffect(() => {
    persistLocalData('title', todoListTitle);
    document.title = todoListTitle;
    return () => (document.title = 'TooDoOOO!');
  }, [todoListTitle]);

  useEffect(() => {
    persistLocalData('TodoItems', todoItems);
  }, [todoItems]);

  useEffect(() => {
    persistLocalData('tags', tags);
  }, [tags]);

  useEffect(() => {
    persistLocalData('colors', colors);
  }, [colors]);

  const closeDialog = () => {
    setShowDialog(false);
  };

  /* UPDATE TITLE */
  const updateTodoListTitle = (newTitle) => setTodoListTitle(newTitle);

  /* TODO CUD */
  const addNewTodo = (newTodoObj) => {
    console.log(`adding new todo item: ${newTodoObj.name}`);
    setTodoItems([...todoItems, newTodoObj]);
    scrollToBottom(todoListRef);
  };

  const updateTodoName = (name, oldName) => {
    console.log({ name, oldName });
    setTodoItems((prevObjs) =>
      prevObjs.map((todo) => {
        if (todo.name === oldName) return { ...todo, name };
        return todo;
      })
    );
  };

  const deleteTodo = (todo) => {
    console.log('delete');

    setTodoItems([...todoItems].filter((item) => item !== todo));
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

  /* DIALOG */
  const cancelEditTag = () => {
    setCancelEditing(true);
    closeDialog();
  };

  /* COLOR/TAGS CUD */
  const getAttributeType = (type) => {
    const attrsObj = {};

    switch (type) {
      case 'tags':
        attrsObj.attributes = tags;
        attrsObj.setAttrState = setTags;
        return attrsObj;
      case 'colors':
        attrsObj.attributes = colors;
        attrsObj.setAttrState = setColors;
        return attrsObj;
      default:
        alert('invalid entry! how did you get here?');
        break;
    }
  };

  const isUsedBy = (attr, type) => {
    if (type === 'tags')
      return [...todoItems].filter((item) => item[type].includes(attr));

    if (type === 'colors')
      return [...todoItems].filter((item) => item.color === attr);
  };

  /* CREATE */
  const addNewAttribute = (newAttr, type) => {
    const { attributes, setAttrState } = getAttributeType(type);
    // only add new if attribute doesn't already exist
    const attrSet = new Set([...attributes]);
    if (!attrSet.has(newAttr)) {
      attrSet.add(newAttr);
      setAttrState([...attrSet]);
    } else {
      setDialogObj({
        text: `OPE! ${newAttr} already exists in ${type} and will not be added.`,
        buttons: [
          {
            btnTxt: 'Ok fine 😒',
            callback: cancelEditTag,
          },
        ],
      });
      setShowDialog(true);
    }
  };

  /* DELETE */
  const deleteAllInstances = (toDelete, type) => {
    setTodoItems((prevObjs) =>
      prevObjs.map((todo) => {
        if (type === 'colors' && todo.color === toDelete)
          return { ...todo, color: '' };

        if (type === 'tags' && todo[type].includes(toDelete))
          return {
            ...todo,
            [type]: todo[type].filter((attr) => attr !== toDelete),
          };
        return todo;
      })
    );
  };

  const deleteAttr = (toDelete, attributes, setAttrState) => {
    setAttrState([...attributes].filter((item) => item !== toDelete));
  };

  const confirmDeleteAttribute = (toDelete, type) => {
    console.log({ toDelete, type });

    const { attributes, setAttrState } = getAttributeType(type);
    const alreadyInUse = isUsedBy(toDelete, type);
    console.log({ alreadyInUse });

    if (alreadyInUse.length) {
      const singularType = type.replace('s', '');
      const text = `This ${singularType} is currently assigned to:\n${alreadyInUse.map(
        ({ name }) => `\n * ${name.toUpperCase()}`
      )} \n \n Deleting this ${singularType} would also remove it from all of those items. Would you like to proceed?`;
      const buttons = [
        {
          btnTxt: 'delete all instances',
          callback: () => {
            deleteAllInstances(toDelete, type);
            deleteAttr(toDelete, attributes, setAttrState);
          },
        },
        {
          btnTxt: 'cancel',
          callback: cancelEditTag,
        },
      ];
      setDialogObj({ text, buttons });
      setShowDialog(true);
    } else {
      deleteAttr(toDelete, attributes, setAttrState);
    }
  };

  /* UPDATE TAGS */
  const updateTagName = (tagName, oldTagName) => {
    const tagsCopy = [...tags];
    const i = tags.indexOf(oldTagName);
    tagsCopy[i] = tagName;
    setTags(tagsCopy);
  };

  const applyTagName = (tagName, oldTagName) => {
    console.log({ tagName, oldTagName });

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

  const confirmUpdateTagName = (tagName, oldTagName) => {
    setCancelEditing(false);

    const alreadyInUse = isUsedBy(oldTagName, 'tags');
    console.log({ alreadyInUse });

    if (alreadyInUse.length > 0) {
      const text = `This Tag is currently assigned to:\n${alreadyInUse.map(
        ({ name }) => `\n * ${name.toUpperCase()}`
      )} \n \n Would you like to apply the new tag name to these items, create a new tag instead, or disregard?`;
      const buttons = [
        {
          btnTxt: 'apply to all',
          callback: () => {
            applyTagName(tagName, oldTagName);
            updateTagName(tagName, oldTagName);
          },
        },
        {
          btnTxt: 'create new',
          callback: () => addNewAttribute(tagName, 'tags'),
        },
        {
          btnTxt: 'cancel',
          callback: cancelEditTag,
        },
      ];
      setDialogObj({ text, buttons });
      setShowDialog(true);
    } else {
      applyTagName(tagName, oldTagName);
    }
  };

  const assignAttribute = (attr, target, type) => {
    console.log(`assigning ${attr} to ${target}`);
    setTodoItems((prevObjs) =>
      prevObjs.map((todo) => {
        if (todo.name === target) {
          if (type === 'colors') return { ...todo, color: attr };
          if (type === 'tags') return { ...todo, tags: [...todo.tags, attr] };
        }
        return todo;
      })
    );
  };

  const removeAttribute = (attr, target, type) => {
    console.log(`removing ${attr} from ${target}`);
    setTodoItems((prevObjs) =>
      prevObjs.map((todo) => {
        if (todo.name === target) {
          if (type === 'tags')
            return {
              ...todo,
              tags: [...todo.tags].filter((tag) => tag !== attr),
            };
        }
        return todo;
      })
    );
  };

  /* FILTERING */

  const handleSearchInput = (event) => setSearchTerm(event.target.value);
  const clearInput = () => setSearchTerm('');

  useEffect(() => {
    console.log('in update filtered');

    if (!searchTerm) return setFilteredTodos([...todoItems]);
    console.log('in update filtered 2');

    searchTerm.toLowerCase();
    const filteredTodoItems = [...todoItems].filter(({ name }) =>
      name.toString().toLowerCase().includes(searchTerm)
    );
    setFilteredTodos(filteredTodoItems);
  }, [searchTerm, todoItems]);

  const filterByColor = (filterColor) => {
    console.log(`filtering by color: ${filterColor}`);
    setFilteredTodos(
      [...todoItems].filter(({ color }) => color === filterColor)
    );
  };

  const clearAllFilters = () => {
    console.log('clearing filters');
    setFilteredTodos([...todoItems]);
  };

  const filterByTags = (filterTags) => {
    console.log(`filtering by tags array: ${filterTags}`);
    setFilteredTodos(
      [...todoItems].filter(({ tags: itemTags }) =>
        filterTags.every((tag) => itemTags.includes(tag))
      )
    );
  };
  /* DRAG REORDERING */
  const reorderList = useCallback(
    (newOrder) => {
      setTodoItems(newOrder.map((i) => todoItems[i]));
    },
    [todoItems]
  );

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
              updateFunction={updateTodoListTitle}
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
                colors={colors}
                tags={tags}
                assignAttribute={assignAttribute}
                clearAllFilters={clearAllFilters}
                confirmUpdateTagName={confirmUpdateTagName}
                deleteTodo={deleteTodo}
                filterByColor={filterByColor}
                filterByTags={filterByTags}
                removeAttribute={removeAttribute}
                todoListRef={todoListRef}
                toggleChecked={toggleChecked}
                updateTodoName={updateTodoName}
                reorderList={reorderList}
                // order={order}
                // setOrder={setOrder}
              />
            )}
            exact
          />
          <Route
            path="/tags"
            render={() => (
              <Tags
                cancelEditing={cancelEditing}
                tags={tags}
                addNewAttribute={addNewAttribute}
                confirmDeleteAttribute={confirmDeleteAttribute}
                confirmUpdateTagName={confirmUpdateTagName}
              />
            )}
          />
          <Route
            path="/colors"
            render={() => (
              <Colors
                colors={colors}
                addNewAttribute={addNewAttribute}
                confirmDeleteAttribute={confirmDeleteAttribute}
              />
            )}
          />
          {/* <Route component={NotFound} /> */}
        </Transition>
        <AddNew
          tagsLength={tags.length}
          todoItemsLength={todoItems.length}
          addNewTodo={addNewTodo}
          addNewAttribute={addNewAttribute}
        />
      </ToDoListContainer>
    </>
  );
}

export default App;
