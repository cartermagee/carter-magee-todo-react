# carter-magee-todo-react
good ole to-do list! built in react

##Technology used
react
create-react-app
styled-components
react-spring
and other libraries to accompany them

## Approach

I went about this with the intention of using a mix of technologies I've been using on personal projects and tech that I've been wanting to use. 

With any project, development or anything in life, I try to take care of all the small, easy things I can before I come to the major task that brings them all together and repeat for every other major task. This way the client or I can see progress actively being made instead of trying to take on a harder goal first and having nothing to show for it for however long it takes. Worst case scenario you spend 2 weeks on a mojor problem and don't complete it for whatever reason and then you look bad! As you can see by my commits the hardest part for me and last thing I did was the sort on drag functionality, which ended up causing my stylings to get crazy and introduced a bug when adding a new list item. 
Anyway I tried to follow a blend of both SOLID and DRY dev principles as best I could. I also tried to write code that explained itself as well as it could, but sometimes at the expense of efficiency. For example, in most cases array.filter is less efficient than an old school for loop but my intention was to filter the array. Hopefully a user won't have a todo list long enough for it to be an issue lol! Also I realize the drag on sort functionality in `TodoList.js` is pretty hard to read because of the destructuring of state from react-use-gesture and what it's doing under the hood. I had to read the docs on that a few times myself! 

If I could start this over today I might try to approach it by having my list items state be one big object, instead on an array, with basically indexed keys like `sampleTodoListObjects` in my sampleData.js. This way I could reassign the keys to the corresponding order on sort and display in the page in that order. Also I could alter the state way more precisely and efficiently for a lot of things. Also I didn't think this project would need `context` outside of the theme but later realized I exceeded my personal prop drilling limit of 5x in a couple places so I would definitely would have done that from the start and memo-ized the collections (list items, tags, colors, etc) to prevent unnecessry re-renders. It should be fine for this but again somebody with a very long todo list with a bunch of tags might cause the app to jank out.

## Recipes 
key * means I have used this in a project before 
* dark mode - https://stackoverflow.com/a/57795495
* Editable.js - an adaptation of something I found but I can't remember where!
background color detection - https://24ways.org/2010/calculating-color-contrast/
* useClickOutside - based off the one found at https://usehooks.com/
sll the other custom hooks I based off that one. 
react-spring stuff:
https://codesandbox.io/s/runtime-sky-3gwfx  
* https://codesandbox.io/s/react-spring-tabs-with-direction-v2wt0
there are many more and I'll add to this list as I review my code again tonight.

#Thanks for looking! 
