/**
 * Created by orel- on 08/Dec/15.
 */
import alt from '../alt';
import AddFeedActions from '../actions/AddCogActions';

class AddFeedStore {
    constructor() {
        this.bindActions(AddFeedActions);
        this.name = '';
        this.author = 'Red';
        this.description = '';
        this.commands = '';
        this.screenshots = [];
        this.githubLink = '';
        this.updates = [];
        this.helpBlock = '';
    }

    onAddFeedSuccess(successMessage){
        this.helpBlock = successMessage;
    }

    onAddFeedFail(errorMessage){
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

}

export default alt.createStore(AddFeedStore);