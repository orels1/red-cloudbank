/**
 * Created by orel- on 07/Dec/15.
 */
import React from 'react';
import AddFeedStore from '../stores/AddFeedStore';
import AddFeedActions from '../actions/AddFeedActions';

class AddFeed extends React.Component {
    constructor(props){
        super(props);
        this.state = AddFeedStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        AddFeedStore.listen(this.onChange);
    }

    componentWillUnmount(){
        AddFeedStore.unlisten(this.onChange);
    }

    onChange(state){
        this.setState(state);
    }

    handleSubmit(event){
        event.preventDefault();

        var feedEntry = {};

        feedEntry.knbId = this.state.knbId.trim();
        feedEntry.targetUser = this.state.targetUser;
        feedEntry.targetUserAvatar = this.state.targetUserAvatar;
        feedEntry.moder = this.state.moder;
        feedEntry.action = this.state.action;
        feedEntry.reason = this.state.reason;
        feedEntry.scrUrl = this.state.scrUrl;

        if(feedEntry.knbId && feedEntry.targetUser && feedEntry.targetUserAvatar && feedEntry.moder && feedEntry.action && feedEntry.reason && feedEntry.scrUrl){
            AddFeedActions.addFeed(feedEntry);
        }else{
            return toastr.error('Заполните все поля');
        }

    }

    render(){
        return(
            <div className='col-md-6 col-md-offset-3'>
                <div className='panel panel-default'>
                    <div className='panel-heading'>Новая запись</div>
                    <div className='panel-body'>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className='form-group'>
                                <label className='control-label'>Kanobu Id</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    ref='knbIdTextField'
                                    placeholder="пример: 223456"
                                    value={this.state.knbId}
                                    onChange={AddFeedActions.updateKnbId} autoFocus
                                />
                            </div>
                            <div className='form-group'>
                                <label className='control-label'>Юзер</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    ref='targetUserTextField'
                                    placeholder="пример: R0han"
                                    value={this.state.targetUser}
                                    onChange={AddFeedActions.updateTargetUser}
                                />
                            </div>
                            <div className='form-group'>
                                <label className='control-label'>Аватар</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    ref='targetUserAvatarTextField'
                                    placeholder="пример: http://u.kanobu.ru/c/42/3463042/avatar.jpg"
                                    value={this.state.targetUserAvatar}
                                    onChange={AddFeedActions.updateTargetUserAvatar}
                                />
                            </div>
                            <div className='form-group'>
                                <label className='control-label'>Модер</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    ref='moderTextField'
                                    placeholder="пример: orels1"
                                    value={this.state.moder}
                                    onChange={AddFeedActions.updateModer}
                                />
                            </div>
                            <div className='form-group'>
                                <div className='radio'>
                                    <label htmlFor='ban'>
                                    <input
                                        type='radio'
                                        name='action'
                                        id='ban'
                                        value='Бан'
                                        checked={this.state.action === 'Бан'}
                                        onChange={AddFeedActions.updateAction}
                                    />
                                        Бан
                                    </label>
                                </div>
                                <div className='radio'>
                                    <label htmlFor='warn'>
                                    <input
                                        type='radio'
                                        name='action'
                                        id='warn'
                                        value='Предупреждение'
                                        checked={this.state.action === 'Предупреждение'}
                                        onChange={AddFeedActions.updateAction}
                                    />
                                    Предупреждение
                                    </label>
                                </div>
                            </div>
                            <div className='form-group'>
                                <label className='control-label'>Причина</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    ref='nameTextField'
                                    placeholder="пример: Надоел спамить"
                                    value={this.state.reason}
                                    onChange={AddFeedActions.updateReason}
                                />
                            </div>
                            <div className='form-group'>
                                <label className='control-label'>Скриншот</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    ref='nameTextField'
                                    placeholder="пример: http://puu.sh/lRqXH/8cf7f57ebe.jpg"
                                    value={this.state.scrUrl}
                                    onChange={AddFeedActions.updateScrUrl}
                                />
                            </div>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddFeed;