# NextHealth Frontend Web Developer Homework

Hi there! Thanks for applying to the NextHealth Frontend Web Developer position. Web d like to have you complete a small homework assignment to help up understand your coding skills.

Once youb ve completed the assignment, youb ll submit it back to us, and web ll determine next steps.

If you have any questions at all, let me (Ken) know at khoff@nexthealthtechnologies.com!

<!-- toc -->

- [Considerations](#considerations)
- [Requirements](#requirements)
  * [Tech](#tech)
  * [Features](#features)
  * [Above and beyond](#above-and-beyond)
- [Submitting your assignment](#submitting-your-assignment)

<!-- tocstop -->

## Considerations

-   **The requirements specified below are exactly that b  requirements.** Your submission should meet all the requirements. However, they arenb t the only things that web re looking for in the project b  this project is meant to be an opportunity for you to flex your skills and show us what youb re capable of.
    -   Much of what we're testing is your attention to detail - your ability to carefully make sure that requirements are satisfied, and that all boxes are checked.
    -   And, much of what we're testing is your ability to be independent, adapt, improvise, and read between the lines - e.g., what requirements are assumed? (yes, the page should probably not crash or run out of memory. no, the user probably shouldn't be able to submit an empty string. the user should be able to submit a string consisting of all emoji........maybe? p	)
-   **Approach this project with the same rigor as you would working with a dev team on a real project.** What this entails is up to you b  documentation, testing, continuous integration and deployment, PR / commit formatting, linting, and language style guides could all be part of this.
-   **Cite your sources.** If you used any tutorials, articles, recipes, courses, or other guided technical resources, please mention them as part of your submission. It's okay to leave out official documentation for libraries, frameworks, and other tools you'll use.
-   **Use version control.** You'll need to submit a git repo on a hosted version control service (GitHub, GitLab, BitBucket, etc), but we'd also like to see your thought process via commit history, if possible.
-   **Deploy your code to a hosted, production-like environment.** We'd like to be able to interact with your project as an end-user, which means hosting this project in a working state on the internet somewhere. This isn't a backend / devops position, but having a basic knowledge of web app deployment is necessary.
-   **Be prepared to explain your code and decisions.** As part of the next phase of the interview process, we'll dive pretty deep into your submission and expect you to justify why you built things the way you did. It will be pretty clear if you fully understand why parts of your code work the way that they do, and pretty clear if you copy-pasted from an article or had a friend write it for you.

## Requirements

### Tech

We're primarily a React team, so we'd prefer that you stick to that. However, if you think that using a different stack would be a better showcase of your skills, feel free!

You're welcome to use popular tools and libraries where you see fit - e.g. `create-react-app`, Bootstrap. Be prepared to discuss the tradeoffs of using those tools and libraries. If you'd prefer to roll everything by hand, be prepared to discuss the details of what you use.

### Features

Web d like you to create a simple in-browser todo list. The todo list will display a list of text todo list items, and the user will be able to add new todo list items via a form at the bottom of the list. The user will also be able to complete todo list items, rename todo list items, move todo list items up and down the list, delete todo list items by clicking a b deleteb  button next to each todo list item, and filter todo list items by string.

Your Todo List should include:

-   A displayed list of todo items
    -   Each todo item consists of some text
    -   Users should be able to "delete" or "complete" todo list items
    -   If the user "deletes" the todo list item, the todo list item should be removed from the todo list.
    -   If a user "completes" the todo list item, the item should visually indicate that the item was completed.
    -   Users should be able to reorder the todo list items in the following ways
        -   Move a todo list item up by one position
        -   Move a todo list item down by one position
        -   Move a todo list item to the top of the list
        -   Move a todo list item to the bottom of the list
    -   Users should be able to rename todo list items
-   A form at the bottom of the todo list, with:
    -   An input text element
    -   A b submitb  button
    -   When the user clicks the b submitb  button, the new todo list item should be added to the end of the list
    -   when the user hits "enter", the new todo list item should be added to the end of the list
-   The todo list should persist between page refreshes
-   Users should be able to search / filter the list using a text input box at the top of the list. If a user types a string into the text input box, then only the todo list items that contain that string should be displayed.

### Above and beyond

-   File upload / image support
-   Hotkeys
-   Labels / tags on todo list items
-   Onboarding / tutorializing
-   Delete confirmation
-   Offline support
-   Drag-and-drop to reorder

## Submitting your assignment

-   Upload your source code to a repo on a version control service - GitHub, BitBucket, etc
    -   Please ensure that your repo is publicly viewable, or if youb d like to keep it private, get in touch with khoff@nexthealthtechnologies.com so that we can work out a way to access it.
-   Your app should be running in a hosted, production environment somewhere - a static site hosting service is fine, but feel free to use whatever you want. Heroku, S3, GitHub Pages, Next, etc
-   Please send a link to your source code and a link to your hosted application to khoff@nexthealthtechnologies.com, or to the recruiter that you're working with. We'll take it from there!
