/**
 * Created by orel- on 08/Dec/15.
 */
import alt from '../alt';

class HomeActions {
    constructor() {
        this.generateActions(
            'addFeedEvent'
        );
    }
}

export default alt.createActions(HomeActions);