import React, { useEffect } from 'react';
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
const Home = (props) => {
  const listQueue = [];
  const auth = getAuth()
  useEffect(() => {
    /* Create reference to messages in Firebase Database */
    // if(props.email){
    //   fire.database().ref('email').push({email:props.email})
    // }
    //Get the current userID
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      //  console.log(fire.database().ref('users/' + userId))

      const db = getDatabase();
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          update(ref(db, 'users/' + userId), {
            email: props.user.email,
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
        listQueue.push(listvalue);
        if (listQueue.length > 0) {
          handleChildAddedQueue()
        }
      });
    }
  }, [auth.currentUser]);

  useEffect(() => {
    if(props.todos.statusToggleData){
      const db = getDatabase();
      const auth = getAuth();
      const userId = auth.currentUser.uid;
      const updateListRef = ref(db, 'users/' + userId + '/list/' + props.todos.statusToggleData.id)
      update(updateListRef, { status: props.todos.statusToggleData.text.status });
    }
  }, [props.todos.statusToggleData])

  useEffect(() => {
    let list
    switch (props.visibilityFilter) {
      case 'done':
        list = props.todos.list.filter((item, i) => {
          return item.text.status === 'checked'
        })
        break;
      case 'due':
        list = [...props.todos.list].sort(({ text: { diffDays: diffDays1 } }, { text: { diffDays: diffDays2 } }) => { return diffDays1 - diffDays2 });
        break;
      case 'remaining':
        list = props.todos.list.filter((item, i) => {
          return item.text.status !== 'checked'
        })
        break;
      default:
        list = props.todos.list
    }
    console.log(list);
    props.dispatch(updateTodoState({
      displayList: list,
    }))
  }, [props.visibilityFilter])

  const handleChildAddedQueue = () => {
    const list = [...listQueue];
    console.log('here', props.todos.list)
    console.log(...listQueue)
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
    props.dispatch(updateTodoState({
      list,
      displayList: list,
      doneTasks: doneTasks,
      showListLoader: false
    }))
  }

  const handleFilterChange = (e) => {
    e.preventDefault();
    const seletedOption = e.target.selectedOptions[0]
    if (!seletedOption) {
      return;
    }
    const optionName = seletedOption.getAttribute('name').toLowerCase();
    props.dispatch(setVisibilityFilter(optionName))
  }
  const statusToggle = (e) => {
    const id = e.target.id;
    props.dispatch(statusToggleTodo(id));
  }

  const handleDeleteList = (e) => {
    e.stopPropagation();
    let id = e.target.id;
    confirmAlert({
      title: 'Are you sure?',
      message: 'You want to delete this task?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            props.dispatch(deleteList(id));
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

  return (
    <div>
      <AddTodo />
      <div className="listWrapper">
        {props.todos.showListLoader
          ?
          <div className='dataLoader'>
            <Loader
              type="Bars"
              color="#00BFFF"
              height="50"
              width="50"
            />
          </div> :
          props.todos.list.length === 0
            ? <h2>No tasks</h2>
            : <React.Fragment>
              <Filter list={props.todos.list} handleFilterChange={handleFilterChange} />
              <List displayList={props.todos.displayList} handleDeleteList={handleDeleteList} statusToggle={statusToggle} />
            </React.Fragment>
        }
      </div>
      <div className='donetasks'>Total done task:{props.todos.doneTasks}/{props.todos.list.length}</div>
    </div>
  );
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