/**
 * Created by orel- on 06/Dec/15.
 */
import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import CogListStore from '../stores/CogListStore';
import CogListActions from '../actions/CogListActions';
import Modal from 'react-modal';

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

    openModal(name) {
        CogListActions.openModal(name);
    }

    closeModal() {
        CogListActions.closeModal();
    }

    render() {
        let cogsList = this.state.cogs.map((cogItem, index) => {
            return (
                <div key={cogItem._id}>
                    <div className="col-md-6">
                        <div className='panel panel-default animated fadeIn cogsList'>
                            <div className='panel-heading'>
                                <div className="cogsList-field">
                                    <small>{cogItem.name}</small>
                                    <strong>{cogItem.fullName}</strong>
                                </div>
                            </div>
                            <div className="panel-body">
                                {cogItem.description}
                            </div>
                            <div className="panel-footer">
                                <div className="cogsList-field">
                                    <small>Author</small>
                                    <a href={cogItem.author.split(' - ')[1]}>
                                        <strong>{cogItem.author.split(' - ')[0]}</strong>
                                    </a>
                                </div>
                                <button className="btn btn-primary pull-right" onClick={this.openModal.bind(null, cogItem.name)}>Install</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
                <div>
                    {cogsList}
                    <Modal
                        className="Modal__Bootstrap modal-dialog"
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal.bind(this)}
                    >

                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={this.closeModal.bind(this)}>
                                    <span aria-hidden="true">&times;</span>
                                    <span className="sr-only">Close</span>
                                </button>
                                <h4 className="modal-title">Install custom cog</h4>
                            </div>
                            <div className="modal-body">
                                <p>To install the cog, simply copy-paste a command below into your server's channel which is monitored by your bot</p>
                                <p>Do not forget to replace <i>[p]</i> with your bot's prefix</p>
                                <pre>
                                    [p]cog install {this.state.cogToInstall}
                                </pre>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" onClick={this.closeModal.bind(this)}>Close</button>
                            </div>
                        </div>

                    </Modal>
                </div>

        );
    }
}

export default CogsList;