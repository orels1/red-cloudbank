/**
 * Created by orel- on 07/Dec/15.
 */
import alt from '../alt';
import CogListActions from '../actions/CogListActions.js';

class CogListStore {
    constructor() {
        this.bindActions(CogListActions);
        this.cogs = [];
        this.modalIsOpen = false;
        this.cogToInstall = '';
    }

    onGetCogsSuccess(data) {
        this.cogs = data;
    }

    onGetCogsFail(jqXhr) {
        toastr.error(jqXhr.responseText);
    }

    onOpenModal(name){
        this.modalIsOpen = true;
        this.cogToInstall = name;
    }

    onCloseModal(){
        this.modalIsOpen = false;
        this.cogToInstall = '';
    }
}

export default alt.createStore(CogListStore);