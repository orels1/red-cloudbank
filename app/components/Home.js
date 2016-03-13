/**
 * Created by orel- on 06/Dec/15.
 */
import React from 'react';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import {Link} from 'react-router';

import CogsList from './CogList';

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

                <div className="col-md-10 col-md-offset-1">
                    <h2 className="welcome"> Welcome to Red-Cloudbank! </h2>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <p>This is the place for all the custom cogs to live for your amusement :D</p>
                            <p>
                                To view all the cogs, please use the <Link to="/list"><b>List</b></Link> link in a topbar.
                                <br />
                                There you will find cogs, their descriptions and installation instructions, so you won't need to type the commands yourself (it's 21 century, for god's sake! :D ).
                            </p>
                            <p>If you don't know what Red is, and what's it all about - check this <a href="https://github.com/Twentysix26/Red-DiscordBot"><b>repo</b></a>, you will find all the info there.</p>
                            <p>
                                That's all there is to it! Feel free to explore, add your own cogs (check the <Link to="/add"><b>Add</b></Link> link in a topbar to find out how) and have a good time.
                             </p>
                            <p>
                                If you have any questions or suggestions - feel free to message me <a href="https://discord.gg/0k4npTwMvTo9TQoj"><b>here</b></a>, I go by "orels1" nickname.
                                <br />
                                If you encounter any bugs or other issues - please add it an issue tracker <a href="https://github.com/orels1/red-cloudbank/issues"><b>here</b></a>, I will be very thankful.
                            </p>
                            <p>All credits for Red goes to an awesome <a href="https://github.com/Twentysix26"><b>Twentysix26</b></a>, you can support him <a href="https://www.patreon.com/Twentysix26?ty=h"><b>here</b></a>.</p>

                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;