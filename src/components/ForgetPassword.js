import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuth, sendPasswordResetEmail } from '@firebase/auth';
import { updateAppState } from '../actions'
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
        const auth = getAuth();
        sendPasswordResetEmail(auth, email).then((user) =>  {
            alert('Reset password link is sent to your email')
            // this.props.handleShowComponent('showFP',false)
            this.props.dispatch(updateAppState({ showFP: false }))
        }).catch((error) => {
            console.log('Error occurred', error)
            // alert(error.message)
            this.props.dispatch(updateAppState({ error: error.message }))
            // this.setState({ error: error.message });
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
                            <button type="button" className="cancelbtn" onClick={()=>{this.props.handleShowComponent({ showFP: false})}}>Cancel</button>
                        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);