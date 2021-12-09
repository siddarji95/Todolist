import React, { Component } from 'react';
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, TwitterAuthProvider, FacebookAuthProvider } from "firebase/auth";
import './Login.css';
import { connect } from 'react-redux'
import { faFacebookSquare, faTwitterSquare, faGooglePlusSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Login extends Component {
  constructor(props) {
    super(props);
    this.email = null
    this.password = null
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.signIn = this.signIn.bind(this)
    console.log(this.email, this.password)
    this.providers = {
      facebookProvider: new FacebookAuthProvider(),
      twitterProvider: new TwitterAuthProvider(),
      googleProvider: new GoogleAuthProvider(),
    };
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state)
    // this.props.dispatch(updateAppState(state))
  }

  signIn(provider) {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Login Successfully', result.user.displayName)
      }).catch((error) => {
        throw new Error(error)
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state)
    const { email, password } = this.state;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('Login successfully', user)
      })
      .catch((error) => {
        console.log('Error occurred', error)
        this.setState({ error: error.message });
        if (error.code === 'auth/wrong-password') {
          alert('Wrong password');
        } else if (error.code === 'auth/user-not-found') {
          alert('There is no user record corresponding to this email. Please signup or Login with Social Media');
        } else {
          alert(error.message);
        }
      });
  }

  render() {
    const providers = {
      facebookProvider: new FacebookAuthProvider(),
      twitterProvider: new TwitterAuthProvider(),
      googleProvider: new GoogleAuthProvider(),
    };
    return (
      <div className='Login'>
        <div className="container">
          <div className="row">
            <h2 >Login with Social Media or Manually</h2>
            <div className="vl">
              <span className="vl-innertext">or</span>
            </div>

            <div className="col">
              <button onClick={() => { this.signIn(providers.facebookProvider) }} className="fb btn">
                <FontAwesomeIcon icon={faFacebookSquare} /> Facebook
              </button>
              <button onClick={() => { this.signIn(providers.twitterProvider) }} className="twitter btn">
                <FontAwesomeIcon icon={faTwitterSquare} /> Twitter
              </button>
              <button onClick={() => { this.signIn(providers.googleProvider) }} className="google btn">
                <FontAwesomeIcon icon={faGooglePlusSquare} /> Google+
              </button>
            </div>

            <div className="col">
              <div className="hide-md-lg">
                <p>Or sign in manually:</p>
              </div>
              <form>
                <input type="email" name="email" placeholder="Email" required onChange={this.handleChange} />
                <input type="password" name="password" placeholder="Password" required onChange={this.handleChange} />
                <input type="submit" value="Login" onClick={this.handleSubmit} />
              </form>
            </div>
          </div>
        </div>

        <div className="bottom-container">
          <div className="row">
            <div className="col">
              <button className="btn" onClick={() => { this.props.handleShowComponent({ showSignup: true }) }}>Sign up</button>
            </div>
            <div className="col">
              <button className="btn" onClick={() => { this.props.handleShowComponent({ showFP: true }) }}>Forgot password?</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);