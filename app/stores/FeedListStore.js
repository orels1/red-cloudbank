/**
 * Created by orel- on 07/Dec/15.
 */
import alt from '../alt';
import FeedListActions from '../actions/FeedListActions.js';

class FeedListStore {
    constructor() {
        this.bindActions(FeedListActions);
        this.feeds = [];
    }

    onGetFeedSuccess(data) {
        this.feeds = data;
    }

    onGetFeedFail(jqXhr) {
        toastr.error(jqXhr.responseText);
    }
}

export default alt.createStore(FeedListStore);