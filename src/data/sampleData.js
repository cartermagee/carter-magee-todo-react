import uid from 'uid';

export const sampleData = [
  {
    id: uid(),
    color: 'red',
    complete: false,
    name: 'do the dishes',
    tags: ['kitchen', 'morning'],
  },
  {
    id: uid(),
    color: 'green',
    complete: true,
    name: 'take out the trash',
    tags: ['kitchen', 'morning', 'outside'],
  },
  {
    id: uid(),
    color: 'blue',
    complete: false,
    name: 'shower',
    tags: ['bathroom', 'morning'],
  },
  {
    id: uid(),
    color: 'darkgoldenrod',
    complete: true,
    name: 'clean litter box',
    tags: ['bathroom', 'pets'],
  },
];

export const sampleDataObjects = {
  0: {
    id: uid(),
    color: 'red',
    complete: false,
    name: 'do the dishes',
    tags: ['kitchen', 'morning'],
  },
  1: {
    id: uid(),
    color: 'green',
    complete: true,
    name: 'take out the trash',
    tags: ['kitchen', 'morning', 'outside'],
  },
  2: {
    id: uid(),
    color: 'blue',
    complete: false,
    name: 'shower',
    tags: ['bathroom', 'morning'],
  },
  3: {
    id: uid(),
    color: 'darkgoldenrod',
    complete: true,
    name: 'clean litter box',
    tags: ['bathroom', 'pets'],
  },
};
