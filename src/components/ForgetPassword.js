import React, { Component } from 'react';
import fire from '../fire';
class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:null,
            error:null
        }
        this.handleForgetPassword = this.handleForgetPassword.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleForgetPassword() {
        const { email } = this.state;
        fire.auth().sendPasswordResetEmail(email).then((user) =>  {
            alert('Reset password link is sent to your email')
            this.props.handleShowComponent('showFP',false)
        }).catch((error) => {
            console.log('Error occurred', error)
            // alert(error.message)
            this.setState({ error: error.message });
        });
    }
    handleChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div className="ForgetPassword Signup">
                <div className="container">
                    <div className="row">
                        <h2>Forget Password</h2>
                        <h4>{this.state.error}</h4>
                        <input type="email" placeholder="Enter Email" name="email" required onChange={this.handleChange}/>
                    </div>
                </div>

                <div className="clearfix">
                            <button type="submit" className="signupbtn" onClick={this.handleForgetPassword}>Submit</button>
                            <button type="button" className="cancelbtn" onClick={()=>{this.props.handleShowComponent('showFP',false)}}>Cancel</button>
                        </div>

            </div>
        );
    }
}

export default ForgetPassword;