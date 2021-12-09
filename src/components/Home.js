import React, { Component } from 'react';
import { connect } from 'react-redux'
import Filter from './Filter';
import { updateTodoState, deleteList, setVisibilityFilter, statusToggleTodo } from '../actions'
import AddTodo from '../containers/AddTodo.js'
import List from '../containers/List';
import { getAuth } from '@firebase/auth';
import { getDatabase, ref, child, get, update, remove, onChildAdded } from "firebase/database";
import Loader from 'react-loader-spinner'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "react-datepicker/dist/react-datepicker.css";
class Home extends Component {
  constructor(props) {
    super(props)
    this.listQueue = [];
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleDeleteList = this.handleDeleteList.bind(this)
    this.statusToggle = this.statusToggle.bind(this)
  }
  componentDidMount() {
    /* Create reference to messages in Firebase Database */
    // if(this.props.email){
    //   fire.database().ref('email').push({email:this.props.email})
    // }

    const auth = getAuth()
    //Get the current userID
    const userId = auth.currentUser.uid;
    //  console.log(fire.database().ref('users/' + userId))

    const db = getDatabase();
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        update(ref(db, 'users/' + userId), {
          email: this.props.user.email,
        })
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

    const listRef = ref(db, 'users/' + userId + '/list')
    onChildAdded(listRef, (snapshot) => {
      /* Update React state when message is added at Firebase Database */
      let listvalue = { text: snapshot.val(), id: snapshot.key };
      console.log(listvalue)
      this.listQueue.push(listvalue);
      if (this.listQueue.length > 0) {
        this.handleChildAddedQueue()
      }
    });
  }
  handleChildAddedQueue() {
    const list = [...this.listQueue];
    console.log('here', this.props.todos.list)
    console.log(...this.listQueue)
    const doneTasks = list.filter((item, i) => {
      return item.text.status === 'checked'
    }).length;
    list.forEach((value, index) => {
      let today = new Date();
      let dueDate = new Date(value.text.dueDate)
      let diffTime = (dueDate.getTime() - today.getTime());
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      value.text.diffDays = diffDays;
    });
    this.props.dispatch(updateTodoState({
      list,
      displayList: list,
      doneTasks: doneTasks,
      showListLoader: false
    }))
  }
  changeFilter() {
    let list
    console.log(this.props.visibilityFilter)
    switch (this.props.visibilityFilter) {
      case 'done':
        list = this.props.todos.list.filter((item, i) => {
          return item.text.status === 'checked'
        })
        break;
      case 'due':
        list = [...this.props.todos.list].sort(({ text: { diffDays: diffDays1 } }, { text: { diffDays: diffDays2 } }) => { return diffDays1 - diffDays2 });
        break;
      case 'remaining':
        list = this.props.todos.list.filter((item, i) => {
          return item.text.status !== 'checked'
        })
        break;
      default:
        list = this.props.todos.list
    }
    console.log(list);
    this.props.dispatch(updateTodoState({
      displayList: list,
    }))
  }
  handleFilterChange(e) {
    e.preventDefault();
    const seletedOption = e.target.selectedOptions[0]
    if (!seletedOption) {
      return;
    }
    const optionName = seletedOption.getAttribute('name').toLowerCase();
    this.props.dispatch(setVisibilityFilter(optionName)).then(() => {
      this.changeFilter();
    });

  }
  statusToggle(e) {
    const id = e.target.id;
    this.props.dispatch(statusToggleTodo(id)).then(() => {
      const db = getDatabase();
      const auth = getAuth();
      const userId = auth.currentUser.uid;
      const updateListRef = ref(db, 'users/' + userId + '/list/' + id)
      update(updateListRef, { status: this.props.todos.currentTodoData.text.status });
    });
  }

  handleDeleteList(e) {
    e.stopPropagation();
    let id = e.target.id;
    confirmAlert({
      title: 'Are you sure?',
      message: 'You want to delete this task?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.props.dispatch(deleteList(id));
            const db = getDatabase();
            const auth = getAuth();
            const userId = auth.currentUser.uid;
            const removeListRef = ref(db, 'users/' + userId + '/list/' + id)
            remove(removeListRef);
          }
        },
        {
          label: 'No',
          onClick: () => console.log('No')
        }
      ]
    });
  }

  render() {
    console.log(this.props.user.displayName)
    return (
      <div className="Home">
        {
          this.props.user.displayName
            ?
            <div className='header'>{this.props.user.displayName.toUpperCase()}</div>
            : <div className='header'>{this.props.user.displayName}</div>
        }
        <AddTodo />
        <div className="listWrapper">
          {this.props.todos.showListLoader
            ?
            <div className='dataLoader'>
              <Loader
                type="Bars"
                color="#00BFFF"
                height="50"
                width="50"
              />
            </div> :
            this.props.todos.list.length === 0
              ? <h2>No tasks</h2>
              : <React.Fragment>
                <Filter list={this.props.todos.list} handleFilterChange={this.handleFilterChange} />
                <List displayList={this.props.todos.displayList} handleDeleteList={this.handleDeleteList} statusToggle={this.statusToggle} />
              </React.Fragment>
          }
        </div>
        <div className='donetasks'>Total done task:{this.props.todos.doneTasks}/{this.props.todos.list.length}</div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    visibilityFilter: state.visibilityFilter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

