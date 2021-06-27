import React, { Component } from 'react';
import fire from '../../fire';
import './Login.css';
import { connect } from 'react-redux'
import { updateAppState } from '../../actions'
import { faFacebookSquare, faTwitterSquare, faGooglePlusSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Login extends Component {
  constructor(props) {
    super(props);
    this.email = null
    this.password = null
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
        [e.target.name]:e.target.value
    })
    // this.props.dispatch(updateAppState(state))
  }

  handleShowComponent(state) {
    this.props.dispatch(updateAppState(state))
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    fire.auth().signInWithEmailAndPassword(email, password).then((user) => {
      console.log('Login successfully', user)
    })
    .catch((error) => {
        console.log('Error occurred', error)
        this.setState({ error: error.message });
        if (error.code === 'auth/wrong-password') {
          alert('Wrong password');
        } else if (error.code === 'auth/user-not-found'){
          alert('There is no user record corresponding to this email. Please signup or Login with Social Media');
        } else{
          alert(error.message);
        }
      });
  }

  render() {
    return (
      <div className='Login'>
        <div className="container">
            <div className="row">
              <h2 >Login with Social Media or Manually</h2>
              <div className="vl">
                <span className="vl-innertext">or</span>
              </div>

              <div className="col">
                <button onClick={this.props.signInWithFacebook} className="fb btn">
                  <FontAwesomeIcon icon={faFacebookSquare} /> Facebook
                   </button>
                <button onClick={this.props.signInWithTwitter} className="twitter btn">
                  <FontAwesomeIcon icon={faTwitterSquare} /> Twitter
                  </button>
                <button onClick={this.props.signInWithGoogle} className="google btn">
                  <FontAwesomeIcon icon={faGooglePlusSquare} /> Google+
                  </button>
              </div>

              <div className="col">
                <div className="hide-md-lg">
                  <p>Or sign in manually:</p>
                </div>
                <form>
                <input type="email" name="email" placeholder="Email" required ref={node => this.email = node}/>
                <input type="password" name="password" placeholder="Password" required ref={node => this.password = node} />
                <input type="submit" value="Login" onClick={this.handleSubmit}/>
                </form>
              </div>
           </div> 
        </div>

        <div className="bottom-container">
          <div className="row">
            <div className="col">
              <button className="btn" onClick={()=>{this.handleShowComponent({ showSignup: true })}}>Sign up</button>
            </div>
            <div className="col">
              <button className="btn" onClick={()=>{this.handleShowComponent({ showFP: true })}}>Forgot password?</button>
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