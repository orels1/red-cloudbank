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
        this.user = {
            auth: false,
            username: 'red',
            id: 0
        };
    }

    //onFindCog(payload) {
    //    payload.history.pushState(null, '/profiles/' + payload.knbId);
    //}
    //
    //onFindCriminalFail(payload) {
    //    payload.searchForm.classList.add('shake');
    //    setTimeout(() => {
    //        payload.searchForm.classList.remove('shake');
    //    }, 1000);
    //}

    onUpdateSearchQuery(event) {
        this.searchQuery = event.target.value;
    }

    onUpdateAjaxAnimation(className) {
        this.ajaxAnimationClass = className; //fadein or fadeout
    }

    onGetUserInfoSuccess(data){
        this.user = data;
    }

    onGetUserInfoFail(jqXhr){
        toastr.error(jqXhr.responseText);
    }
}

export default alt.createStore(NavbarStore);