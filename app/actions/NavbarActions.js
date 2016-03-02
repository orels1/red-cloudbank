/**
 * Created by orel- on 06/Dec/15.
 */
import alt from '../alt';
import {assign} from 'underscore';

class NavbarActions {
    constructor(){
        this.generateActions(
            'updateSearchQuery',
            'updateAjaxAnimation',
            'findCriminalSuccess',
            'findCriminalFail',
            'getCriminalsCountSuccess',
            'getCriminalsCountFail',
            'getUserInfoSuccess',
            'getUserInfoFail'
        );
    }

    findCriminal(payload){
        $.ajax({
            url: '/api/feed/search',
            data: { name: payload.searchQuery }
        })
            .done((data) => {
                assign(payload, data);
                this.actions.findCriminalSuccess(payload);
            })
            .fail(() => {
                this.actions.findCriminalFail(payload);
            });
    }

    getCriminalsCount(){
        $.ajax({ url: '/api/feed/count'})
            .done((data) => {
                this.actions.getCriminalsCountSuccess(data);
            })
            .fail((jqXhr) => {
                this.actions.getCriminalsCountFail(jqXhr);
            })
    }

    getUserInfo(){
        $.ajax({
            url: '/api/users/profile',
            method: 'GET'
        })
            .done((data) =>{
                this.actions.getUserInfoSuccess(data);
            })
            .fail((jqXhr) =>{
                this.actions.getUserInfoFail(jqXhr);
            });
    }
}

export default alt.createActions(NavbarActions);