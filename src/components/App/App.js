import React, { Component } from 'react';
import './App.css';
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
      showLoader: true,
      showSignup: false,
      showFP:false
    }
    this.handleShowComponent = this.handleShowComponent.bind(this)
    setTimeout(() => {
      this.setState({ showLoader: false })
    }, 3000);
    firebase.auth().onAuthStateChanged(user => {
      if (user.hasOwnProperty('user'))
        console.log('onAuthStateChanged', user)
      if (user) {
        this.setState({ showLoader: false })
      }
      else if (user.hasOwnProperty('user')) {
        this.props.user = user.user
      }
    })
  }
  handleShowComponent(cvar,val) {
    this.setState({ [cvar]: val })
  }
  render() {
    // console.log('render')
   
    const {
      user,
      signOut,
      signInWithFacebook,
      signInWithTwitter,
      signInWithGoogle,
    } = this.props;

    return (
      <div className="App">
        {
          this.state.showLoader
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
                <button type="button" className="btn btn-default btn-sm logout" onClick={signOut} >
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
                      handleShowComponent={this.handleShowComponent}
                    /> : !this.state.showFP
                    ?
                    <Signup handleShowComponent={this.handleShowComponent} user={user}/>
                    : <ForgetPassword handleShowComponent={this.handleShowComponent} user={user}/> 
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
export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
