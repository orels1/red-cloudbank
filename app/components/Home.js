/**
 * Created by orel- on 06/Dec/15.
 */
import React from 'react';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import {Link} from 'react-router';

import FeedList from './FeedList';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = HomeStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        HomeStore.listen(this.onChange);
    }

    componentWillUnmount() {
        HomeStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    render(){
        var feedEvents = this.state.liveFeed.map((event, index) => {
            return(
                <div key={Math.random()}>
                    {index} | {event.moder} added
                    &nbsp;<span className='text-info'><b>{event.action}</b></span>&nbsp;
                    to {event.targetUser}
                    (<Link to={'/profiles/'+event.knbId} >{event.knbId}</Link>)
                </div>
            );
        });

        return(
            <div>
                <div className="clearfix"></div>

                <div className="col-md-12">
                    <FeedList params={{limit:3}} />
                </div>
            </div>
        );
    }
}

export default Home;