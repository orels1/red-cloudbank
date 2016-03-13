/**
 * Created by orel- on 07/Dec/15.
 */
import alt from '../alt';

class CogListActions {
    constructor() {
        this.generateActions(
            'getCogsSuccess',
            'getCogsFail',
            'openModal',
            'closeModal'
        );
    }

    getCogItems(payload) {
        let url = '/api/cogs/list';
        let params = {
            cogName: payload.cogName
        };

        if (payload.cogId){
            params.cogId = payload.cogId;
        }

        if(payload.limit){
            params.limit = payload.limit;
        }

        if(payload.order){
            params.order = payload.order;
        }

        $.ajax({ url: url, data: params })
            .done((data) => {
                this.actions.getCogsSuccess(data);
            })
            .fail((jqXhr) => {
                this.actions.getCogsFail(jqXhr);
            });
    }
}

export default alt.createActions(CogListActions);