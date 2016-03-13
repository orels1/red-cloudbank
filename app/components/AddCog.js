/**
 * Created by orel- on 07/Dec/15.
 */
import React from 'react';
import AddCogStore from '../stores/AddCogStore';
import AddCogActions from '../actions/AddCogActions';
import Dropzone from 'react-dropzone';
import {Link} from 'react-router';

class AddCog extends React.Component {
    constructor(props){
        super(props);
        this.state = AddCogStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        AddCogStore.listen(this.onChange);
    }

    componentWillUnmount(){
        AddCogStore.unlisten(this.onChange);
    }

    onChange(state){
        this.setState(state);
    }

    render(){
        return(
            <div className='col-md-6 col-md-offset-3'>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">How to add your cog</div>
                    </div>
                    <div className="panel-body">
                        <p><b>Best way:</b> Make a pull request on <a href="https://github.com/Twentysix26/Red-Cogs"><b>github</b></a>, of course by cloning the repo and putting the folder you just created inside the "cogs" folder.</p>
                        <p>Not so good way: Zip the folder and send it to the staff/dev on <a href="https://discord.gg/0k4npTwMvTo9TQoj"><b>the server</b></a>. We will take a look at it and publish it whenever we have time</p>
                        <br />
                        <p>All the requirements for user-created cogs can be found <a href="https://github.com/Twentysix26/Red-DiscordBot/wiki/Publishing-your-cog"><b>here</b></a></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddCog;