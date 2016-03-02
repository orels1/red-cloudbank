/**
 * Created by orel- on 08/Dec/15.
 */
import alt from '../alt';

class FeedListActions {
    constructor() {
        this.generateActions(
            'addCogSuccess',
            'addCogFail',
            'updateName',
            'updateDescription',
            'updateCommands',
            'updateScreenshots',
            'updateGithubLink'
        );
    }

    addCog(cog){
        $.ajax({
            type: 'POST',
            url: '/api/cogs/add',
            data: cog
        })
            .done((data) => {
                this.actions.addCogSuccess(data.message);
            })
            .fail((jqXhr) => {
                this.actions.addCogFail(jqXhr.responseJson.message);
            });
    }
}

export default alt.createActions(FeedListActions);