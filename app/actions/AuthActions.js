/**
 * Created by orel- on 01/Feb/16.
 */
import alt from '../alt';
import {assign} from 'underscore';

class AuthActions {
    constructor(){
        this.generateActions(
            'loginSuccess',
            'loginFail',
            'updateUsername',
            'updatePassword',
            'registrationToggle',
            'changeStatus',
            'logoutSuccess',
            'logoutFail'
        );
    }

    login(payload){
        var url = '/api/';

        //Form URL
        if(!payload.registration){
            url += 'login'
        }else{ url += 'signup' }

        $.ajax({
            type: 'POST',
            url: url,
            data: {username: payload.username, password: payload.password}
        })
            .done((data) => {
                this.actions.changeStatus({ref: payload.ref, className: 'success'});
                this.actions.loginSuccess(data);
            })
            .fail((jqXhr) => {
                this.actions.changeStatus({ref: payload.ref, className: 'error'});
                this.actions.loginFail(jqXhr);
            });
    }

    logout(){
        $.ajax({
            type: 'GET',
            url: '/api/logout'
        })
            .done((data) => {
                this.actions.logoutSuccess(data);
            })
            .fail((jqXhr) => {
                this.actions.logoutFail(jqXhr);
            })
    }
}

export default alt.createActions(AuthActions);
