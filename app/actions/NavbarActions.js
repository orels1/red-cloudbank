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
            'findCogSuccess',
            'findCogFail',
            'getUserInfoSuccess',
            'getUserInfoFail'
        );
    }

    findCog(payload){
        $.ajax({
            url: '/api/cogs/search',
            data: { name: payload.searchQuery }
        })
            .done((data) => {
                assign(payload, data);
                this.actions.findCogSuccess(payload);
            })
            .fail(() => {
                this.actions.findCogFail(payload);
            });
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