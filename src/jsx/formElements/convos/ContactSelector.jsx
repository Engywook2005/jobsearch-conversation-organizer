import React, { Component } from 'react';

class ContactSelector extends Component {
    constructor(props) {
        super(props);

        // @TODO - constant?
        this.standByDiv  = <div>Stand by</div>

        // View state can be select or details
        // If details show all details about contact and make editable.
        this.state = {
            viewstate : this.props.contactID ?
                'details' :
                'select',
            dataReady: false,
            contactDetails: {
                contactID: this.props.contactID
            }
        }
    }

    // Is OK to do one at a time.
    updateDetails(prop, val) {
        const newState = this.state;

        newState.contactDetails[prop] = val;

        this.setState(newState);
    }

    render() {
        if(this.state.viewstate === 'select') {
            return(<div>
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
        }
    }
}

module.exports = ContactSelector;