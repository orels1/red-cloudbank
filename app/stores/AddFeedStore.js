/**
 * Created by orel- on 08/Dec/15.
 */
import alt from '../alt';
import AddFeedActions from '../actions/AddFeedActions';

class AddFeedStore {
    constructor() {
        this.bindActions(AddFeedActions);
        this.knbId = '';
        this.targetUser = '';
        this.targetUserAvatar = '';
        this.moder = '';
        this.action = '';
        this.reason = '';
        this.scrUrl = '';
        this.helpBlock = '';
    }

    onAddFeedSuccess(successMessage){
        this.helpBlock = successMessage;
    }

    onAddFeedFail(errorMessage){
        this.helpBlock = errorMessage;
    }

    onUpdateKnbId(event){
        this.knbId = event.target.value;
        this.helpBlock = '';
    }

    onUpdateTargetUser(event){
        this.targetUser = event.target.value;
    }

    onUpdateTargetUserAvatar(event){
        this.targetUserAvatar = event.target.value;
    }

    onUpdateModer(event){
        this.moder = event.target.value;
    }

    onUpdateAction(event){
        this.action = event.target.value;
    }

    onUpdateReason(event){
        this.reason = event.target.value;
    }

    onUpdateScrUrl(event){
        this.scrUrl = event.target.value;
    }

}

export default alt.createStore(AddFeedStore);