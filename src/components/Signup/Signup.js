import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateAppState } from '../../actions'
import { getAuth, updateProfile, createUserWithEmailAndPassword } from '@firebase/auth';
import './Signup.css';

class Signup extends Component {
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
    handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log('Signup successfully', userCredential, this.state.name)
            return updateProfile(auth.currentUser, {
                displayName: this.state.name,
            }).then(() => {
                console.log('user profile updated', this.state.name)
                this.props.dispatch(updateAppState({
                    user: auth.currentUser,
                }))
            }).catch((error) => {
                throw new Error(error)
            });
        })
            .catch((error) => {
                console.log('Error occurred', error)
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
            <div className='Signup'>
                <form style={{ border: '1px solid #ccc' }}>
                    <div className="container">
                        <h1>Sign Up</h1>
                        <h3>{this.state.error}</h3>
                        <p>Please fill in this form to create an account.</p>
                        <hr />
                        <input type="text" placeholder="Enter Name" name="name" required onChange={this.handleChange} />
                        <input type="email" placeholder="Enter Email" name="email" required onChange={this.handleChange} />
                        <input type="password" placeholder="Enter Password" name="password" required onChange={this.handleChange} />

                        <input type="password" placeholder="Repeat Password" name="password-repeat" required onChange={this.handleChange} />

                        <div className="clearfix">
                            <button type="submit" className="signupbtn" onClick={this.handleSubmit}>Submit</button>
                            <button type="button" className="cancelbtn" onClick={() => { this.props.handleShowComponent({ showSignup: false }) }}>Cancel</button>
                        </div>
                    </div>
                </form>

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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);