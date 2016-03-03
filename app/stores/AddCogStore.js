/**
 * Created by orel- on 08/Dec/15.
 */
import alt from '../alt';
import AddFeedActions from '../actions/AddCogActions';
import moment from 'moment';

class AddFeedStore {
    constructor() {
        this.bindActions(AddFeedActions);
        this.name = '';
        this.author = 'Red';
        this.description = '';
        this.commands = '';
        this.initialFile = {
            filename: '#',
            cogName: 'untitled'
        };
        this.screenshots = [];
        this.githubLink = '';
        this.updates = [];
        this.helpBlock = '';
    }

    onAddCogFeedSuccess(successMessage){
        this.helpBlock = successMessage;
    }

    onAddCogFail(errorMessage){
        this.helpBlock = errorMessage;
    }

    onUpdateName(event){
        this.name = event.target.value;
    }

    onUpdateDescription(event){
        this.description = event.target.value;
    }

    onUpdateCommands(event){
        this.commands = event.target.value;
    }

    onUpdateScreenshots(event){
        this.screenshots = event.target.value;
    }

    onUpdateGithubLink(event){
        this.githubLink = event.target.value;
    }

    onUploadCogSuccess(data){
        toastr.success('Cog file uploaded');
        this.initialFile.filename = '/uploads/' + data.filename;
        this.initialFile.cogName = data.cogName;
    }

    onUploadCogFail(jqXhr){
        toastr.error(jqXhr.responseText);
    }

}

export default alt.createStore(AddFeedStore);