import styles from '../../../constants/styles';
import ContactDetails from '../../forms/conversations/ContactDetails.jsx';
import React, { Component } from 'react';

class ContactSelector extends Component {
    constructor(props) {
        super(props);

        // @TODO - constant?
        this.standByDiv  = <div>Stand by</div>

        // View state can be select or details
        // If details show all details about contact and make editable.
        this.state = {
            viewstate : this.props.convoData.contactID ?
                'details' :
                'select',
            dataReady: false,
            convoData: this.props.convoData
        }
    }

    changeView(newView) {
        this.setState({viewstate: newView})
    }

    // Is OK to do one at a time.
    updateDetails(prop, val) {
        const newState = {
            currentConvoData: {}
        };

        // @FIXME this restriction should be set at ConvoEdit.
        newState.currentConvoData[prop] = val;

        // No longer setting our own state.
        this.props.updateState(newState);
    }

    render() {
        // @TODO option to create new contact
        if(this.state.viewstate === 'select') {
            return(<div>
                <p>name: <span
                    style = {styles.buttonStyle}
                    onClick = {
                    (e) => {
                        this.changeView('details');
                    }
                }>Add new contact</span></p>
                <select
                    onChange = {(e) => {
                        this.updateDetails.call(this, 'contactID', e.target.value);
                    }}>

                    {this.props.contactList.map((contact, i) => <option
                            value = {contact.contactID}
                            key = {i}
                    >{`${contact.firstName || ''} ${contact.lastName || ''}`}</option>)
                    }
                </select>
            </div>);
        } else if(this.state.viewstate === 'details') {
            return(<div>
                <ContactDetails
                    contactList             = {this.props.contactList}
                    convoData               = {this.state.convoData}
                    loadConversationData    = {this.props.loadConversationData}
                    setNewContactID         = {this.props.setNewContactID}
                />
            </div>);
        }
    }
}

module.exports = ContactSelector;