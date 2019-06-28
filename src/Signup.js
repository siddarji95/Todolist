import React, { Component } from 'react';
import './Signup.css';
import fire from './fire';
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSignup:this.props.showSignup,
            name:null,
            email:null,
            password:null,
            error:null
        }
        this.handleCancel = this.handleCancel.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleCancel(e) {
        e.preventDefault();
        this.props.handleShowSignup(false)
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        console.log(email,password)
       fire.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        console.log('Signup successfully',user)
        return user.user.updateProfile({
            displayName: this.state.name
          })
      })
      .catch((error) => {
        console.log('Error occurred',error)
        this.setState({ error: error.message });
      });
         
      };

    handleChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value
        })
         console.log(this.state)
     }
    render() {
        return (
            <div className='Signup'>
                <form style={{ border: '1px solid #ccc' }}>
                    <div className="container">
                        <h1>Sign Up</h1>
                        <h3>{this.state.error}</h3>
                        <p>Please fill in this form to create an account.</p>
                        <hr />
                        <input type="text" placeholder="Enter Name" name="name" required onChange={this.handleChange}/>
                        <input type="text" placeholder="Enter Email" name="email" required onChange={this.handleChange}/>
                        <input type="password" placeholder="Enter Password" name="password" required onChange={this.handleChange}/>

                        <input type="password" placeholder="Repeat Password" name="password-repeat" required onChange={this.handleChange}/>

                        <div className="clearfix">
                            <button type="submit" className="signupbtn" onClick={this.handleSubmit}>Submit</button>
                            <button type="button" className="cancelbtn" onClick={()=>{this.props.handleShowSignup(false)}}>Cancel</button>
                        </div>
                    </div>
                </form>

            </div>
        );
    }
}

export default Signup;