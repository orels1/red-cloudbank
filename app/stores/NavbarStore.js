/**
 * Created by orel- on 06/Dec/15.
 */
import alt from '../alt';
import NavbarActions from '../actions/NavbarActions';

class NavbarStore {
    constructor(){
        this.bindActions(NavbarActions);
        this.searchQuery = '';
        this.ajaxAnimationClass = '';
        this.totalCriminals = 0;
        this.user = {
            auth: false,
            username: 'moder',
            id: 0
        };
    }

    onFindCriminalSuccess(payload) {
        payload.history.pushState(null, '/profiles/' + payload.knbId);
    }

    onFindCriminalFail(payload) {
        payload.searchForm.classList.add('shake');
        setTimeout(() => {
            payload.searchForm.classList.remove('shake');
        }, 1000);
    }

    onUpdateSearchQuery(event) {
        this.searchQuery = event.target.value;
    }

    onUpdateAjaxAnimation(className) {
        this.ajaxAnimationClass = className; //fadein or fadeout
    }

    onGetCriminalsCountSuccess(data) {
        this.totalCriminals = data;
    }

    onGetCriminalsCountFail(jqXhr) {
        toastr.error(jqXhr.responseText);
    }

    onGetUserInfoSuccess(data){
        this.user = data;
    }

    onGetUserInfoFail(jqXhr){
        toastr.error(jqXhr.responseText);
    }
}

export default alt.createStore(NavbarStore);