const todos = (state = {
  input: '',
  list: [],
  displayList: [],
  currentTodoData: null,
  statusToggleData: null,
  doneTasks: 0,
  dueDate: null,
  showListLoader: true,
  filter: null,
}, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      const currentTodoData = {};
      currentTodoData.name = action.input;
      currentTodoData.status = '';
      const dueDate = (state.dueDate.getMonth() + 1) + '/' + state.dueDate.getDate() + '/' + state.dueDate.getFullYear();
      currentTodoData.dueDate = dueDate
      return {
        ...state,
        currentTodoData,
        input: '',
        dueDate: null,
      }
    }
    case 'ADD_DUE_DATE': {
      return {
        ...state,
        dueDate: action.date,
      }
    } 
    case 'UPDATE_TODO_STATE':
      return {
        ...state,
        ...action.state,
      }
    case 'DELETE_LIST': {
      const list = state.list.filter((item, i) => {
        return item.id !== action.id
      })
      const displayList = state.displayList.filter((item, i) => {
        return item.id !== action.id
      })
      const doneTasks = list.filter((item, i) => {
        return item.status === 'checked'
      }).length;
      return {
        ...state,
        list: list,
        displayList: displayList,
        doneTasks: doneTasks,
      }
    }
    case 'STATUS_TOGGLE_TODO': {
      const statusToggleData = state.list.find((item) => {
        return item.id === action.id;
      });
      statusToggleData.text.status = statusToggleData.text.status === 'checked' ? '' : 'checked';
      const doneTasks = state.list.filter((item, i) => {
        return item.text.status === 'checked'
      }).length;
      return {
        ...state,
        statusToggleData,
        doneTasks,
      }
    } 
    default:
      return state
  }
}

export default todos