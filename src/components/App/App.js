import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { updateAppState, updateTodoState } from '../../actions'
import Home from '../Home';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import ForgetPassword from '../ForgetPassword';
import fire from '../../fire';
import * as firebase from 'firebase/app';
import Loader from 'react-loader-spinner';
import 'firebase/auth';
import withFirebaseAuth from 'react-with-firebase-auth';
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
    setTimeout(() => {
      this.props.dispatch(updateAppState({
        showAppLoader: false,
      }))
    }, 3000);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.dispatch(updateAppState({
          showAppLoader: false,
        }))
      }
    })
  }

  handleLogOut(){
    this.props.signOut();
    this.props.dispatch(updateTodoState({
      list: [],
      displayList: [],
      doneTasks: 0,
      showListLoader: true
    }))
  }

  handleShowComponent(cvar,val) {
    console.log(cvar,val)
    this.setState({ [cvar]: val })
  }

  render() {
    // console.log('render')
   
    const {
      user,
      signInWithFacebook,
      signInWithTwitter,
      signInWithGoogle,
    } = this.props;

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
                  : !this.state.showSignup && !this.state.showFP
                    ?
                    <Login
                      signInWithFacebook={signInWithFacebook}
                      signInWithTwitter={signInWithTwitter}
                      signInWithGoogle={signInWithGoogle}
                    /> : !this.state.showFP
                    ?
                    <Signup user={user}/>
                    : <ForgetPassword user={user}/> 
              }
            </React.Fragment>
        }
      </div>
    );
  }
}
const firebaseAppAuth = fire.auth();
const providers = {
  facebookProvider: new firebase.auth.FacebookAuthProvider(),
  twitterProvider: new firebase.auth.TwitterAuthProvider(),
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

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

export default connect(mapStateToProps, mapDispatchToProps)(withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App));
