import fire from '../fire';
const todos = (state = {
  input: '',
  list: [],
  displayList: [],
  currentTodoData: null,
  doneTasks: 0,
  dueDate:null,
  showListLoader: true,
  filter: null,
}, action) => {
  let userId,currentTodoData,dueDate,id,list,doneTasks,displayList;
  switch (action.type) {
    case 'ADD_TODO':
      currentTodoData = {};
      currentTodoData.name = action.input;
      currentTodoData.status = '';
      dueDate = (state.dueDate.getMonth() + 1)  + '/' + state.dueDate.getDate() + '/' + state.dueDate.getFullYear();
      currentTodoData.dueDate = dueDate
      // userId = fire.auth().currentUser.uid;
      // fire.database().ref('users/' + userId + '/list').push(currentInput);
      return {
        ...state,
        currentTodoData,
        input: '',
        dueDate: null,
      }
    case 'ADD_DUE_DATE':
    return {
      ...state,
      dueDate: action.date,
    }
    case 'UPDATE_TODO_STATE': 
    return {
      ...state,
      ...action.state,
    }
    case 'DELETE_LIST':
    userId = fire.auth().currentUser.uid;
    id = action.id;
    list = state.list.filter((item, i) => {
      return item.id !== action.id
    })
    displayList = state.displayList.filter((item, i) => {
      return item.id !== action.id
    })
    doneTasks = list.filter((item, i) => {
      return item.status === 'checked'
    }).length;
    fire.database().ref('users/' + userId + '/list/' + id).remove();
    return {
      ...state,
      list: list,
      displayList: displayList,
      doneTasks: doneTasks,
    }
    case 'STATUS_TOGGLE_TODO':
      currentTodoData = state.list.find((item) => {
        return item.id === action.id;
      });
      currentTodoData.text.status = currentTodoData.text.status === 'checked' ? '' : 'checked';
      doneTasks = state.list.filter((item, i) => {
        return item.text.status === 'checked'
      }).length;
      return {
        ...state,
        currentTodoData,
        doneTasks,
      }
    default:
      return state
  }
}

export default todos