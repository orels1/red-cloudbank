/**
 * Created by orel- on 08/Dec/15.
 */
import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
    constructor(){
        this.bindActions(HomeActions);
        this.liveFeed = [];
    }

    onAddFeedEvent(data){
        this.liveFeed.push(data);
    }
}

export default alt.createStore(HomeStore);