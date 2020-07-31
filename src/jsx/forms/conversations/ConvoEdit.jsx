import Ajax from '../../../http/ajax';
import ContactSelector from '../../formElements/convos/ContactSelector.jsx';
import ConvoDetails from './convoDetails.jsx';
import QueryBuilder from '../../../utils/QueryBuilder';
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate() {
        if(this.state.updating) {
            this.setState({'updating': false});
        }
    }

    handleSubmit(e) {
        const convoData = this.state.currentConvoData;

        convoData.specificPositionID = this.props.viewProps.posID;

        let url = this.isUpdating() ?
            QueryBuilder.createUpdateQuery('conversationmaintable', convoData, {
                'conversationID': this.state.currentConvoData.conversationID
            }) :
            QueryBuilder.createInsertQuery('conversationmaintable', convoData);

        Ajax.doAjaxQuery(url)
            .then((data) => {
                this.props.viewProps.updateFunction.refreshList();
            })
    }

    isUpdating() {
        return this.state.currentConvoData && this.state.currentConvoData.conversationID;
    }

    updateState(newState, needUpdate = true) {
        if(needUpdate) {
            newState.updating = true;
        }
        this.setState(newState);
    }

    setNewContactID(newContactID) {
        this.state.currentConvoData = this.state.currentConvoData || {};
        this.state.currentConvoData.contactID = newContactID;
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
                    return this.loadConversationData(
                        'conversationtype',
                        null,
                        'ORDER BY contactLevel'
                    )
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
            // @TODO should make insert or update based on whether a conversation id exists.
            // @TODO insert/submit button should be at this level.

            <div>
                <ContactSelector
                    convoData               = {this.state.currentConvoData || {}}
                    contactList             = {this.contactList}
                    updateFunction          = {this.props.updateFunction}
                    updateState             = {this.updateState.bind(this)}
                    loadConversationData    = {this.loadConversationData.bind(this)}
                    setNewContactID         = {this.setNewContactID.bind(this)}
                    linkStyle               = {this.props.linkStyle}
                    textfieldValStyle       = {this.props.textfieldValStyle}
                    divFieldStyle           = {this.props.divFieldStyle}
                    buttonStyle             = {this.props.buttonStyle}
                />
                <ConvoDetails
                    convoData               = {this.state.currentConvoData || {}}
                    convoTypes              = {this.convoTypes}
                    updateState             = {this.updateState.bind(this)}
                    textfieldValStyle       = {this.props.textfieldValStyle}
                    divFieldStyle           = {this.props.divFieldStyle}
                    buttonStyle             = {this.props.buttonStyle}
                />
                <button
                    onClick={this.handleSubmit}
                >{this.isUpdating() ?
                    'Update conversation':
                    'Add conversation'
                }</button>
            </div>
        );
    }
}

module.exports = ConvoEdit;