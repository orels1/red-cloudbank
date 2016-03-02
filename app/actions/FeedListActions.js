/**
 * Created by orel- on 07/Dec/15.
 */
import alt from '../alt';

class FeedListActions {
    constructor() {
        this.generateActions(
            'getFeedSuccess',
            'getFeedFail'
        );
    }

    getFeedItems(payload) {
        let url = '/api/feed/list';
        let params = {
            targetUser: payload.targetUser,
            moder: payload.moder
        };

        if (payload.category === 'permanent') {
            url = '/api/feed/permanent';
        }

        if (payload.knbId){
            params.knbId = payload.knbId;
        }

        if(payload.limit){
            params.limit = payload.limit;
        }

        if(payload.order){
            params.order = payload.order;
        }

        $.ajax({ url: url, data: params })
            .done((data) => {
                this.actions.getFeedSuccess(data);
            })
            .fail((jqXhr) => {
                this.actions.getFeedFail(jqXhr);
            });
    }
}

export default alt.createActions(FeedListActions);