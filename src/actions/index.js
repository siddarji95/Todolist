// export const addTodo = input => ({
//   type: 'ADD_TODO',
//   input
// })

export const addTodo = (input) => dispatch => {
  dispatch({
    type: 'ADD_TODO',
    input
  });
  return Promise.resolve();
};

export const addDueDate = date => ({
  type: 'ADD_DUE_DATE',
  date
})

// export const updateList = (state) => dispatch => {
//   dispatch({
//     type: 'UPDATE_LIST',
//     state
//   });
//   return Promise.resolve();
// };

export const updateList = state => ({
  type: 'UPDATE_LIST',
  state
})

export const updateDisplayList = (list) => ({
  type: 'UPDATE_DISPLAY_LIST',
  list
});

export const deleteList = (id) => ({
  type: 'DELETE_LIST',
  id
});

export const setVisibilityFilter = (filter) => dispatch => {
  dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter
  });
  return Promise.resolve();
};

export const statusToggleTodo = (id) => dispatch => {
  dispatch({
    type: 'STATUS_TOGGLE_TODO',
    id
  });
  return Promise.resolve();
};

export const VisibilityFilters = {
  SHOW_ALL: 'all',
  SORT_BY_DUE_DATE: 'due',
  DONE: 'done',
  REMAINING: 'remaining'
}
