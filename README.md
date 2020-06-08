# [pi-top](https://pi-top.com) - Frontend technical test

I have kept the implementation as simple as possible, with `time` constraints in mind.

This does mean I implemented the todo list using a ModalView. In a real world application this would not be recommended.

In a real world application I would have implemented the different pages, list / create / view, as seperate routes, using React Router.

My feelings here were, I would rather implement Redux state management with the available time, even though in an application this size it is total overkill.

However I thought you would get a better view of my coding ability / style implementing something like redux rather than router.

I apologise beforehand if my css modules code is a little beginnerish. I have never worked with them before but felt this would be a great oppurtunity to try them out.

Again with time constraints in mind there is NOT alot of fetching state / error handling within the thunks/reducers.

I am not sure why, but when doing a GET https://backend-test.pi-top.com/todo-test/v1/todos - there is no `description` information being returned.

The POST https://backend-test.pi-top.com/todo-test/v1/todos does however return the description in it's response. So newly created Todos contain a description but fetched ones do not.


To Run:

`yarn install`

`yarn start`