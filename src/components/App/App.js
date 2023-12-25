import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { updateAppState, updateTodoState } from '../../actions'
import * as firebase from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Loader from 'react-loader-spinner';
import config from '../../fire';
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom';

const App = (props) => {
  const history = useHistory();
  firebase.initializeApp(config);
  useEffect(() => {
    setTimeout(() => {
      props.dispatch(updateAppState({
        showAppLoader: false,
      }))
    }, 3000);
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        props.dispatch(updateAppState({
          user,
          showAppLoader: false,
        }))
        history.push("/home");
      } else {
        history.push("/login")
      }
    })
  }, [history])

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      props.dispatch(updateAppState({
        user: null,
      }))
      props.dispatch(updateTodoState({
        list: [],
        displayList: [],
        doneTasks: 0,
        showListLoader: true
      }))
      history.push("/login")
    }).catch((error) => {
      // An error happened.
      throw new Error(error);
    });
  }

  const { user } = props.app;
  return (
    <Header user={user} handleLogOut={handleLogOut} />
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
