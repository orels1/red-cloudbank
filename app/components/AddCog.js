/**
 * Created by orel- on 07/Dec/15.
 */
import React from 'react';
import AddCogStore from '../stores/AddCogStore';
import AddCogActions from '../actions/AddCogActions';
import Dropzone from 'react-dropzone';

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

    handleSubmit(event){
        event.preventDefault();

        var cog = {};

        cog.name = this.state.name.trim();
        cog.description = this.state.description;
        cog.commands = this.state.commands;

        //TODO: implement field parse here
        cog.screenshots = [this.state.screenshots];

        if(cog.name && cog.description){
            AddCogActions.addCog(cog);
        }else{
            return toastr.error('Fill all the fields');
        }

    }

    onDrop(files){
        console.log('Recieved files: ', files);
    }

    render(){
        return(
            <div className='col-md-6 col-md-offset-3'>
                <div className='panel panel-default'>
                    <div className='panel-heading'>New Cog</div>
                    <div className='panel-body'>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className='form-group'>
                                <label className='control-label'>Cog name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    ref='nameTextField'
                                    placeholder="Twitch Notifier"
                                    value={this.state.name}
                                    onChange={AddCogActions.updateName} autoFocus
                                />
                            </div>
                            <div className='form-group'>
                                <label className='control-label'>Cog description</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    ref='descriptionTextField'
                                    placeholder="Twitch notification cog"
                                    value={this.state.description}
                                    onChange={AddCogActions.updateDescription}
                                />
                            </div>
                            <div className='form-group'>
                                <label className='control-label'>Cog commands list</label>
                                <textarea
                                    rows="10"
                                    className='form-control'
                                    ref='commandsAvatarTextField'
                                    placeholder="[p]Twitch alertMe"
                                    value={this.state.commands}
                                    onChange={AddCogActions.updateCommands}
                                >
                                </textarea>
                            </div>
                            <div className='form-group'>
                                <label className='control-label'>Screenshot links</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    ref='screenshotsTextField'
                                    placeholder="http://puu.sh/eXhsmH2g"
                                    value={this.state.screenshots}
                                    onChange={AddCogActions.updateScreenshots}
                                />
                            </div>
                            <div className='form-group'>
                                <label className='control-label'>Github link</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    ref='githubLinkTextField'
                                    placeholder="https://github.com/orels1/red-cloudbank"
                                    value={this.state.githubLink}
                                    onChange={AddCogActions.updateGithubLink}
                                />
                            </div>
                            <div className="form-group">
                                <Dropzone className="dropzone" onDrop={this.onDrop}>
                                    <div>Drop a Cog!</div>
                                </Dropzone>
                            </div>
                            <button type='submit' className='btn btn-primary'>Add Cog</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddCog;