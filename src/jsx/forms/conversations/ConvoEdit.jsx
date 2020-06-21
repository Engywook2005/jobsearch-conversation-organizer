import Ajax from '../../../http/ajax';
import ContactSelector from '../../formElements/convos/ContactSelector.jsx';
import React, { Component } from 'react';

class ConvoEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready:      false,
            updating:   false
        };

        this.contactList = [];
        this.convoTypes = [];
    }

    componentDidUpdate() {
        if(this.state.updating) {
            this.setState({'updating': false});
        }
    }

    updateState(newState) {
        newState.updating = true;
        this.setState(newState);
    }

    loadConversationData(table, where = null, orderBy = '', skipCall = false) {
        return new Promise((resolve, reject) => {
            if(skipCall) {
                resolve({});
                return;
            }

            const whereClause = where ?
                `&where=${JSON.stringify(where)}`:
                '',
                url = `./generalSelex.json?table=${table}${whereClause} ${orderBy}`;
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
                    {'conversationID': convoID},
                    '',
                    convoID ? false: true
                )

                .then((data) => {
                    newState.currentConvoData = data[0];
                    return this.loadConversationData(
                        'contactlist',
                        null,
                        'ORDER BY lastName, firstName'
                    );
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
        if(this.state.updating) {
            return(<div>Updating</div>);
        }

        if(!this.state.ready) {
            return(<div>Stand by for conversation details.</div>)
        }

        return (
            <div>
                <ContactSelector
                    convoData               = {this.state.currentConvoData || {}}
                    contactList             = {this.contactList}
                    updateFunction          = {this.props.updateFunction}
                    updateState             = {this.updateState.bind(this)}
                    loadConversationData    = {this.loadConversationData.bind(this)}
                />
            </div>
        );
    }
}

module.exports = ConvoEdit;