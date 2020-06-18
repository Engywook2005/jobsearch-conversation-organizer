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
        if(this.state.viewstate === 'select') {
            return(<div>
                <p>name</p>
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
            return(<div>Details</div>);
        }
    }
}

module.exports = ContactSelector;