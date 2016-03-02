/**
 * Created by orel- on 07/Dec/15.
 */
import alt from '../alt';

class CogListActions {
    constructor() {
        this.generateActions(
            'getCogSuccess',
            'getCogFail'
        );
    }

    getCogItems(payload) {
        let url = '/api/cogs/list';
        let params = {
            cogName: payload.cogName
        };

        if (payload.cogId){
            params.knbId = payload.cogId;
        }

        if(payload.limit){
            params.limit = payload.limit;
        }

        if(payload.order){
            params.order = payload.order;
        }

        $.ajax({ url: url, data: params })
            .done((data) => {
                this.actions.getCogSuccess(data);
            })
            .fail((jqXhr) => {
                this.actions.getCogFail(jqXhr);
            });
    }
}

export default alt.createActions(CogListActions);