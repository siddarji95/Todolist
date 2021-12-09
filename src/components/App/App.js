import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { updateAppState, updateTodoState } from '../../actions'
import Home from '../Home';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import ForgetPassword from '../ForgetPassword';
import * as firebase from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, TwitterAuthProvider, FacebookAuthProvider } from "firebase/auth";
import Loader from 'react-loader-spinner';
import config from '../../fire';
//import Menu from './Menu';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSignup: false,
      showFP:false
    }
    this.handleShowComponent = this.handleShowComponent.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
    firebase.initializeApp(config);
    setTimeout(() => {
      this.props.dispatch(updateAppState({
        showAppLoader: false,
      }))
    }, 3000);
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        this.props.dispatch(updateAppState({
          user,
          showAppLoader: false,
        }))
      }
    })
  }

  handleShowComponent(state) {
    this.props.dispatch(updateAppState(state))
  }

  handleLogOut(){
    // this.props.signOut();
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      this.props.dispatch(updateAppState({
        user: null,
      }))
      this.props.dispatch(updateTodoState({
        list: [],
        displayList: [],
        doneTasks: 0,
        showListLoader: true
      }))
    }).catch((error) => {
      // An error happened.
      throw new Error(error);
    });
  }

  render() {
    console.log('render',this.props)
    const { user } = this.props.app;
    const providers = {
      facebookProvider: new FacebookAuthProvider(),
      twitterProvider: new TwitterAuthProvider(),
      googleProvider: new GoogleAuthProvider(),
    };

    return (
      <div className="App">
        {
          this.props.app.showAppLoader
            ?
            <div className='loader'>
              <Loader
                type="Plane"
                color="#ffa500"
                height="100"
                width="100"
              />
            </div>
            :
            <React.Fragment> {
              user
                ?
                <button type="button" className="btn btn-default btn-sm logout" onClick={this.handleLogOut} >
                  Log out
                   </button>
                : <div id="myDIV" className="header"> <h2 style={{ margin: 0 }}>To Do List</h2> </div>
            } {
                user
                  ? <Home user={user} />
                  : !this.props.app.showSignup && !this.props.app.showFP
                    ?
                    <Login
                      handleShowComponent={this.handleShowComponent}
                    /> : !this.props.app.showFP
                    ?
                    <Signup user={user} handleShowComponent={this.handleShowComponent}/>
                    : <ForgetPassword user={user} handleShowComponent={this.handleShowComponent}/> 
              }
            </React.Fragment>
        }
      </div>
    );
  }
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
