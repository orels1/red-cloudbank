/**
 * Created by orel- on 08/Dec/15.
 */
import alt from '../alt';
import AddFeedActions from '../actions/AddCogActions';
import moment from 'moment';

class AddFeedStore {
    constructor() {
        this.bindActions(AddFeedActions);
    }
}

export default alt.createStore(AddFeedStore);