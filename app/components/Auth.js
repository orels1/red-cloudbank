/**
 * Created by orel- on 01/Feb/16.
 */
import React from 'react';
import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';

class Auth extends React.Component {
    constructor(props){
        super(props);
        this.state = AuthStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        AuthStore.listen(this.onChange);
    }

    componentWillUnmount(){
        AuthStore.unlisten(this.onChange);
    }

    onChange(state){
        this.setState(state);
    }

    handleRegistrationToggle(event){
        event.preventDefault();

        var registration = this.state.registration ? false : true;

        AuthActions.registrationToggle(registration);
    }

    handleSubmit(event){
        event.preventDefault();

        if(this.state.username && this.state.password){
            if(this.state.password.length >= 6){
                AuthActions.login({
                    username : this.state.username.trim(),
                    password : this.state.password.trim(),
                    registration : this.state.registration,
                    ref: this.refs.statusBlock
                });
            }else{
                toastr.error('Password should be 6 symbols or longer');
            }

        }else{
            toastr.error('Fill all the fields');
        }
    }

    render(){
        return(
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default loginForm">
                    <div className="panel-heading">
                        <h2 className="text-center">{this.state.registration ?  'Become worthy' : 'Prove you\'re worthy'}</h2>
                    </div>
                    <div ref="statusBlock" className={'statusBlock' + this.state.statusClasses}>{this.state.status}</div>
                    <div className="panel-body">
                        <form ref="loginForm" onSubmit={this.handleSubmit.bind(this)}>
                            <input
                                type='text'
                                className='form-control'
                                ref='usernameTextField'
                                placeholder="username"
                                value={this.state.username}
                                onChange={AuthActions.updateUsername} autoFocus
                            />

                            <br />

                            <input
                                type='password'
                                className='form-control'
                                ref='passwordTextField'
                                placeholder="password"
                                value={this.state.password}
                                onChange={AuthActions.updatePassword}
                            />
                            <br />
                            <button type='submit' className='btn btn-primary'>
                                {this.state.registration ? 'Sign Up' : 'Login'}
                            </button>
                            <a href="#" onClick={this.handleRegistrationToggle.bind(this)} className="text-center">
                                {this.state.registration ? 'Login' : 'Sign Up'}
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default Auth;