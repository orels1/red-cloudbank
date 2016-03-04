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
            'updateGithubLink',
            'uploadCogSuccess',
            'uploadCogFail'
        );
    }

    addCog(cog){
        $.ajax({
            type: 'POST',
            url: '/api/cogs/add',
            dataType: 'json',
            data: cog
        })
            .done((data) => {
                this.actions.addCogSuccess(data);
            })
            .fail((jqXhr) => {
                this.actions.addCogFail(jqXhr);
            });
    }

    uploadCog(files){
        var data = new FormData();
        data.append('cog', files[0]);

        console.log(data);

        $.ajax({
            type: 'POST',
            url: '/api/cogs/upload',
            data: data,
            cache: false,
            processData: false,
            contentType: false
        })
            .done((data) =>{
                this.actions.uploadCogSuccess(data);
            })
            .fail((jqXhr) => {
                this.actions.uploadCogFail(jqXhr);
            });
    }
}

export default alt.createActions(FeedListActions);