import React, { Component } from 'react';
import fire from './fire';
import './Login.css';
import { faFacebookSquare, faTwitterSquare, faGooglePlusSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignup: this.props.showSignup,
      name: null,
      email: null,
      password: null,
      error: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({
        [e.target.name]:e.target.value
    })
     console.log(this.state)
 }
  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    console.log(email, password)
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
                  <FontAwesomeIcon icon={faFacebookSquare} /> Login with Facebook
                   </button>
                <button onClick={this.props.signInWithTwitter} className="twitter btn">
                  <FontAwesomeIcon icon={faTwitterSquare} /> Login with Twitter
                  </button>
                <button onClick={this.props.signInWithGoogle} className="google btn">
                  <FontAwesomeIcon icon={faGooglePlusSquare} /> Login with Google+
                  </button>
              </div>

              <div className="col">
                <div className="hide-md-lg">
                  <p>Or sign in manually:</p>
                </div>
                <form>
                <input type="text" name="email" placeholder="Email" required onChange={this.handleChange}/>
                <input type="password" name="password" placeholder="Password" required onChange={this.handleChange} />
                <input type="submit" value="Login" onClick={this.handleSubmit}/>
                </form>
              </div>
           </div> 
        </div>

        <div className="bottom-container">
          <div className="row">
            <div className="col">
              <button className="btn" onClick={() => { this.props.handleShowSignup(true) }}>Sign up</button>
            </div>
            <div className="col">
              <button className="btn">Forgot password?</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;