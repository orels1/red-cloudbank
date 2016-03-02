/**
 * Created by orel- on 01/Feb/16.
 */
import alt from '../alt';
import AuthActions from '../actions/AuthActions';
import NavbarActions from '../actions/NavbarActions';

class AuthStore {
    constructor(){
        this.bindActions(AuthActions);
        this.username = '';
        this.password = '';
        this.registration = false;
        this.status = '';
        this.statusClasses ='';
    }

    onLoginSuccess(data){
        this.status = data;
        NavbarActions.getUserInfo();
    }

    onLoginFail(jqXhr){
        this.status = jqXhr.responseText;
    }

    onLogoutSuccess(data){
        NavbarActions.getUserInfo();
    }

    onLogoutFail(){
        this.status = jqXhr.responseText;
    }

    onUpdateUsername(event){
        this.username = event.target.value;
    }

    onUpdatePassword(event){
        this.password = event.target.value;
    }

    onRegistrationToggle(registration){
        this.registration = registration;
    }

    onChangeStatus(payload){
        payload.ref.classList.remove('success', 'error');
        payload.ref.classList.add('active', payload.className);
        setTimeout(() => {
            payload.ref.classList.remove('active');
        }, 2000);
    }
}

export default alt.createStore(AuthStore)