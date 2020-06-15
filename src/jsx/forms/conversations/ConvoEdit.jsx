import Ajax from '../../../http/ajax';
import React, { Component } from 'react';

class ConvoEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false
        };

        this.peripherals = {};
    }

    updateState(newState) {
        this.setState(newState);
    }

    loadConversationData(table, where = {}, pass = false) {
        return new Promise((resolve, reject) => {
            if(pass) {
                resolve(null);
                return;
            } else {
                const url = `./generalSelex.json?table=${table}&where=${JSON.stringify(where)}`;

                Ajax.doAjaxQuery(url)
                    .then((data) => {
                        this.peripherals[table] = data;
                        resolve(JSON.parse(data));
                    })
            }
        })
    }

    componentDidMount() {
        if(!this.state.ready) {

            // Get initial conversation, if editing any.
            const convoID = this.props.viewProps.data.convoID,
                newState = {};

            this.loadConversationData(
                    'conversationmaintable',
                    {'conversationID': convoID},
                    convoID ? false: true
                )

                // @TODO shouldn't the newState headings be the same as tableName passed to loadConversationData?

                .then((data) => {
                    newState.currentConvoData = data;
                    return this.loadConversationData('contactlist');
                })
                .then((data) => {
                    newState.contactList = data;
                    return this.loadConversationData('conversationtype')
                })
                .then((data) => {
                    newState.convoType = data;

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

        return(<div>ready</div>);
    }
}

module.exports = ConvoEdit;