/**
 * Created by orel- on 07/Dec/15.
 */
import alt from '../alt';
import CogListActions from '../actions/CogListActions.js';

class CogListStore {
    constructor() {
        this.bindActions(CogListActions);
        this.feeds = [];
    }

    onGetFeedSuccess(data) {
        this.feeds = data;
    }

    onGetFeedFail(jqXhr) {
        toastr.error(jqXhr.responseText);
    }
}

export default alt.createStore(CogListStore);