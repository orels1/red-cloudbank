/**
 * Created by orel- on 06/Dec/15.
 */
import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import CogListStore from '../stores/CogListStore';
import CogListActions from '../actions/CogListActions';

class CogsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = CogListStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        CogListStore.listen(this.onChange);
        CogListActions.getCogItems(this.props.params);
        $(document).ready(function(){
            $('.fancybox').fancybox({
                arrows: false,
                closeBtn: false,
                closeClick: true
            });
        })
    }

    componentWillUnmount() {
        CogListStore.unlisten(this.onChange);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.params, this.props.params)) {
            CogListActions.getFeedItems(this.props.params);
        }
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        let cogsList = this.state.cogs.map((cogItem, index) => {
            return (
                <div>
                {cogItem.info && cogItem.author &&
                    <div className="col-md-6">
                        <div key={cogItem._id} className='panel panel-default animated fadeIn feedList'>
                            <div className='panel-heading'>
                                <div className="feedList-field">
                                    <small>{cogItem.name}</small>
                                    <strong><Link to={'/profiles/' + cogItem.knbId}>{cogItem.fullName}</Link></strong>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="feedList-field">
                                    <small>Description</small>
                                    <strong>{cogItem.info}</strong>
                                </div>
                            </div>
                            <div className="panel-footer">
                                <div className="feedList-field">
                                    <small>Author</small>
                                    <strong>{cogItem.author}</strong></div>
                            </div>
                        </div>
                    </div>
                }
                </div>
            );
        });

        return (
                <div>
                    {cogsList}
                </div>
        );
    }
}

export default CogsList;