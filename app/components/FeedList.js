/**
 * Created by orel- on 06/Dec/15.
 */
import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import FeedListStore from '../stores/FeedListStore';
import FeedListActions from '../actions/FeedListActions';

class FeedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = FeedListStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        FeedListStore.listen(this.onChange);
        FeedListActions.getFeedItems(this.props.params);
        $(document).ready(function(){
            $('.fancybox').fancybox({
                arrows: false,
                closeBtn: false,
                closeClick: true
            });
        })
    }

    componentWillUnmount() {
        FeedListStore.unlisten(this.onChange);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.params, this.props.params)) {
            FeedListActions.getFeedItems(this.props.params);
        }
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        let feedList = this.state.feeds.map((feedItem, index) => {
            return (
                <div key={feedItem._id} className='list-group-item animated fadeIn feedList'>
                    <div className='media'>
                        <span className='position pull-left'>{index + 1}</span>
                        {!this.props.compact && //check if has to be compact
                            <div className='pull-left thumb-lg'>
                                <Link to={'/profiles/' + feedItem.knbId}>
                                    <img className='media-object' src={
                                        (feedItem.targetUserAvatar.indexOf(".jpg") == -1 ? "/img/no-ava.jpg" : feedItem.targetUserAvatar)
                                    } />
                                </Link>
                            </div>
                        }
                        <div className='media-body'>
                            {!this.props.compact && //check if has to be compact
                                <div className="feedList-field">
                                    <small>Ник</small>
                                    <strong><Link to={'/profiles/' + feedItem.knbId}>{feedItem.targetUser}</Link></strong>
                                </div>
                            }
                            <div className="feedList-field">
                                <small>Причина</small>
                                <strong>
                                    {feedItem.reason.length <= 30 ? feedItem.reason : feedItem.reason.slice(0,30) + '... '}
                                    {feedItem.reason.length > 30 &&
                                        <a href="#"> показать </a>
                                    }
                                </strong>
                            </div>
                            <div className="feedList-field"><small>Действие</small> <strong>{feedItem.action}</strong></div>
                            <div className="feedList-field"><small>Модер</small> <strong>{feedItem.moder}</strong></div>
                            <div className="feedList-field">
                                <small>Скрин:</small>
                                <strong><a className="fancybox" href={feedItem.scrUrl ? feedItem.scrUrl : '#'}>показать</a></strong>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
                <div className='list-group'>
                    {feedList}
                </div>
        );
    }
}

export default FeedList;