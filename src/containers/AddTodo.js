import React from 'react'
import { getAuth } from '@firebase/auth';
import { getDatabase, ref, update, push } from "firebase/database";
import { connect } from 'react-redux'
import { addTodo, addDueDate } from '../actions'
import DatePicker from "react-datepicker";

class AddTodo extends React.Component {
  render() {
    let input;
    return (
      <div className="addTodo">
        <div className="header">
          <form onSubmit={e => {
            e.preventDefault()
            if (!input.value.trim()) {
              return
            }
            this.props.dispatch(addTodo(input.value)).then(() => {
              const auth = getAuth()
              const userId = auth.currentUser.uid;
              const db = getDatabase();
              const listRef = ref(db, 'users/' + userId + '/list')
              const newListRef = push(listRef);
              update(newListRef, this.props.todos.currentTodoData);
            })
            input.value = '';
          }}>
            <h2 >To Do List</h2>
            <input type="text" className='addTaskInput' placeholder="Add task..." ref={node => input = node} required />
            <div className=''>
              <DatePicker
                selected={this.props.todos.dueDate}
                onChange={this.props.addDueDate}
                className='addDueDateInput'
                placeholderText="MM/DD/YYYY"
                required
              />
            </div>
            <input className="addBtn" type="submit" value="Add" />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDueDate: (date) => {
      dispatch(addDueDate(date));
    },
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
