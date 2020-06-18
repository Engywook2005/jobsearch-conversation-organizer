import Ajax from '../../../http/ajax';
import ContactSelector from '../../formElements/convos/ContactSelector.jsx';
import React, { Component } from 'react';

class ConvoEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false
        };

        this.contactList = [];
        this.convoTypes = [];
    }

    updateState(newState) {
        this.setState(newState);
    }

    loadConversationData(table, where = null, skipCall = false) {
        return new Promise((resolve, reject) => {
            if(skipCall) {
                resolve({});
                return;
            }

            const whereClause = where ?
                `&where=${JSON.stringify(where)}`:
                '',
                url = `./generalSelex.json?table=${table}${whereClause}`;
            Ajax.doAjaxQuery(url)
                .then((data) => {
                    resolve(JSON.parse(data));
                });
        });
    }

    componentDidMount() {
        if(!this.state.ready) {

            // Get initial conversation, if editing any.
            const convoID = this.props.viewProps.data.convoID,
                newState = {};

            this.loadConversationData(
                    'conversationmaintable',
                    convoID ?
                        {'conversationID': convoID}:
                        null,
                    convoID ? false: true
                )

                .then((data) => {
                    newState.currentConvoData = data;
                    return this.loadConversationData('contactlist');
                })
                .then((data) => {
                    this.contactList = data;
                    return this.loadConversationData('conversationtype')
                })
                .then((data) => {
                    this.convoTypes = data;

                    // Ready or not...
                    newState.ready = true;
                    this.updateState(newState);
                });
        }
    }

    render() {
        if(!this.state.ready) {
            return(<div>Stand by for conversation details.</div>)
        }

        return (
            <div>
                <ContactSelector
                    contactID   = {this.state.currentConvoData.contactID || null}
                    contactList = {this.contactList}
                />
            </div>
        );
    }
}

module.exports = ConvoEdit;