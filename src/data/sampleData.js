import uid from 'uid';

export const sampleTodoList = [
  {
    id: uid(),
    color: 'red',
    checked: false,
    name: 'do the dishes',
    tags: ['kitchen', 'morning'],
  },
  {
    id: uid(),
    color: 'green',
    checked: true,
    name: 'take out the trash',
    tags: ['kitchen', 'morning', 'outside'],
  },
  {
    id: uid(),
    color: 'blue',
    checked: false,
    name: 'shower',
    tags: ['bathroom', 'morning'],
  },
  {
    id: uid(),
    color: 'darkgoldenrod',
    checked: true,
    name: 'clean litter box',
    tags: ['bathroom', 'pets'],
  },
];

export const sampleTodoListObjects = {
  0: {
    id: uid(),
    color: 'red',
    checked: false,
    name: 'do the dishes',
    tags: ['kitchen', 'morning'],
  },
  1: {
    id: uid(),
    color: 'green',
    checked: true,
    name: 'take out the trash',
    tags: ['kitchen', 'morning', 'outside'],
  },
  2: {
    id: uid(),
    color: 'blue',
    checked: false,
    name: 'shower',
    tags: ['bathroom', 'morning'],
  },
  3: {
    id: uid(),
    color: 'darkgoldenrod',
    checked: true,
    name: 'clean litter box',
    tags: ['bathroom', 'pets'],
  },
};

export const sampleTags = [
  'tag1',
  'tag2',
  'kjahsdfkjhsa',
  'taaaaaaaaaaaaaaaaaaaaag',
  'kitchen',
  'morning',
];

function sampleFunction() {
  console.log('sample function called');
}
export const sampleDialogObj = {
  text: 'sample text',
  buttons: [
    { btnTxt: 'confirm', callback: sampleFunction },
    { btnTxt: 'cancel', callback: sampleFunction },
  ],
};

export const sampleState = {
  title: 'new todo list',
  listItems: sampleTodoList,
  tagsArray: sampleTags,
};
