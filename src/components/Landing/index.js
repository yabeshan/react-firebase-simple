import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

const Landing = () => (
    <SignInForm />
);

const INITIAL_STATE = {
    email:'',
    password:'',
    error: null,
}

class LogOutBase extends Component {
    onLogOut = event => {
        this.props.firebase
            .doSignOut()
            .then(() => {
                this.props.history.push(ROUTES.LANDING);
            })
            .catch(error => {
                this.props.history.push(ROUTES.LANDING);
            })
        
    }

    render() {
        return (
            <button onClick={this.onLogOut}>LogOut</button>
        );
    }
    
}

const LogOut = withRouter(withFirebase(LogOutBase));

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
        console.log (this.props.firebase.auth.currentUser);
        setTimeout( () => {
            console.log (this.props.firebase.auth.currentUser);
        },2000);
    }

    onChange = event => {
        this.setState({ [event.target.name] : event.target.value });
    }

    onSubmit = event => {
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword( email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({error});
            })
    }

    onRegistration = event => {
        const { email, password } = this.state;
        this.props.firebase
            .doCreateUserWithEmailAndPassword( email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({error});
            })
    }

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <div>
                <p><input
                    name="email"
                    value={email}
                    onChange={this.onChange} 
                    type="text"
                    placeholder="E-mail"
                    /></p>
                <p><input
                    name="password"
                    value={password}
                    onChange={this.onChange} 
                    type="password"
                    placeholder="Password"
                    /></p>
                <button onClick={this.onSubmit}>Login</button>
                <button onClick={this.onRegistration}>Registration</button>
                < LogOut />
                {error && <p><b>ERROR:  </b>{error.message}</p>}
            </div>
        )
    }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default Landing;

export {
    LogOut
};