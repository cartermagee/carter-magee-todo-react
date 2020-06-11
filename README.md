# carter-magee-todo-react
good ole to-do list! built in react

## Technology used
* react
* create-react-app
* styled-components
* react-spring
* react-use-gesture

and other libraries to accompany them

## Approach

I went about this with the intention of using a mix of technologies I've been using on personal projects and tech that I've been wanting to use. 

With any project, development or anything in life, I try to take care of all the small, easy things I can before I come to theWith any project, development or anything in life, I try to take care of all the small, easy things I can before I come to the major milestone task that brings them all together and repeat the process for every other major task in succession. This way the client can physically see progress actively being made instead of trying to take on a harder goal first and having nothing to show for it for however long it takes. Worst case scenario you spend 2 weeks on a major problem and don't complete it for whatever reason and then you look bad! As you can see by my commits the hardest part for me and last thing I did was the sort-on-drag functionality, which ended up causing my stylings to get crazy and introduced a bug when adding a new list item, which I realize is a major miss on the project :/

Anyway I tried to follow a blend of both SOLID and DRY dev principles as best I could. I also tried to write code in a way that explained what it was doing as well as it could; albeit sometimes at the expense of efficiency. For example, in most cases array.filter is less efficient than an old school for loop but I used it when my intention was to filter an array. Hopefully a user won't have a todo list long enough for it to cause any issues lol! Also I realize the drag on sort functionality in `TodoList.js` is pretty hard to read because of the destructuring of state from react-use-gesture and what it's doing under the hood. I had to dive deep into the docs for that a few times myself! 

## Process 
This started pretty close to my personal process in the beginning but it later turned into me trying to cram a lot in in the time I had. 
Here’s my normal approach:
-1 week sprints. 
-Brainstorm, research, and draw out a bunch of ideas on a white board or on paper and narrow down the UI/UX design to something I think like. 
- Plan out my overall roadmap and then current sprint roadmap.
-Draft a basic skeleton with these designs in mind and push to the beta branch. 
-Create feature branches for every step in the process which I would put up for PR before merging into beta and only once they are feature complete. 
-(since it's just me working on it in this case) I would then put that feature down for the rest of the day and work on something else.
-Come back to review the PR first thing the next morning with fresh eyes (I do a lot of my best work between 6-10am for some reason). 
-Upon approval of PR I then test the shit out of it with react-testing-library or jest and then ask a non-tech friend to try it out and give me feedback and adjust accordingly. 
-Ideally I only push beta to master when the app is production ready and as close to perfect as possible without bugs and never have to refactor it forever and ever amen. 

Here's how I tried to allocate my time: https://calendar.google.com/calendar?cid=MDJic2JycW4xMjd0cTZqMTNwMDkwbG4zbGdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ

## Recipes 
(most of these I have used before)
* dark mode - https://stackoverflow.com/a/57795495

* Editable.js - an adaptation of something I found but I can't remember where!
background color detection - https://24ways.org/2010/calculating-color-contrast/

* useClickOutside - based off the one found at https://usehooks.com/
 - all the other custom hooks I based off that one. 

* react-spring stuff:
* https://codesandbox.io/s/runtime-sky-3gwfx  
* https://codesandbox.io/s/react-spring-tabs-with-direction-v2wt0

I know there are more and I'll add to this list as I review my code again.

### Linting 
combo of airbnb/wesbos/react/react-hooks/prettier

## Takeaways 
-If I could start this over today I might try to approach it by having my list items state be one big object, instead of an array, with indexed keys like `sampleTodoListObjects` in my sampleData.js. This way I could reassign the keys to the corresponding order on sort and display in the page in that order. Also I could alter the state way more precisely and efficiently for a lot of things. 
-I didn't think this project would warrant the use of react’s context api outside of the theme but later realized I exceeded my personal prop drilling limit of 5x in a couple places so I would definitely would have done that from the start and memo-ized the collections (list items, tags, colors, etc) to prevent unnecessary re-renders. It should be fine for this but again somebody with a very long todo list with a bunch of tags might cause the app to jank out.

# Thanks for looking! 👨🏻‍💻💗
