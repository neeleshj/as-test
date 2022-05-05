# Anstream Technical Test


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run this project in development mode, run the following from the project directory:
### `yarn`

  ### `yarn start`


## Considerations

In the given time for the task, I could not complete the majority of the tasks; however I do believe it would all be possible.

Instead of creating a grid manually, I opted to use [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout) in order to focus on the logic. This library uses a grid system with a similar implementation to a tile-based 2D game. 

Movement is possible between the generated layout; however, the system to calculate the next valid position needs additional work to handle more complex cases.

I started working on the responsiveness task, and this can be found on the branch [responsiveness](https://github.com/neeleshj/as-test/tree/responsiveness). Notably, the additional grid item properties to support configurations for different screen sizes.

I did not attempt the second task at all, however, my plan for implementation follows. By using a context provider and the input manager, track all of the child nodes of the provider. Using this information with either IDs, references or a pseudoclass to determine what the user is currently attempting to navigate and in turn disable the keyboard navigation for the grid items while the focus is elsewhere.

Note, there are a few things left commented out that were a work in progress.
