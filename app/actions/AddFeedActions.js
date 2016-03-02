/**
 * Created by orel- on 08/Dec/15.
 */
import alt from '../alt';

class FeedListActions {
    constructor() {
        this.generateActions(
            'addFeedSuccess',
            'addFeedFail',
            'updateKnbId',
            'updateTargetUser',
            'updateTargetUserAvatar',
            'updateModer',
            'updateAction',
            'updateReason',
            'updateScrUrl'
        );
    }

    addFeed(feedEntry){
        $.ajax({
            type: 'POST',
            url: '/api/feed',
            data: feedEntry
        })
            .done((data) => {
                this.actions.addFeedSuccess(data.message);
            })
            .fail((jqXhr) => {
                this.actions.addFeedFail(jqXhr.responseJson.message);
            });
    }
}

export default alt.createActions(FeedListActions);