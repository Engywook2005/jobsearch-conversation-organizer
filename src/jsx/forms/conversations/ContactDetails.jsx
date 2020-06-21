import Ajax from '../../../http/ajax';
import React, { Component } from 'react'

// Gets its own submit button. We do not update ConvoViews when submitted.
// ... unless we are adding a new contact. Then we need to add the new contact id. Would at least need to kick this up
// to ConvoEdit.
// So yeah this gets its own update state handler and it should have some visual separation from everything else.
class ContactDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactDetails: this.findCurrentContact(this.props.contactList, this.props.convoData)
        };

        // If insert we will need to kick this upstairs. Hmm.... where best?
        this.state.queryType = (this.props.convoData && this.props.convoData.contactID) ?
            'Update':
            'Insert';
    }

    findCurrentContact(contactList, convoData) {
        let contactDetails = {};

        if(convoData && convoData.contactID) {
            const searchContactID = parseInt(convoData.contactID);

            contactDetails = contactList.filter((contact) => {
                return contact.contactID === searchContactID;
            })[0];
        }

        return contactDetails;
    }

    onFieldChange(key, val) {
        const newContactDetails = this.state.contactDetails;

        newContactDetails[key] = val;

        this.setState({contactDetails: newContactDetails});
    }

    componentDidMount() {
        this.props.loadConversationData('contacttype')
            .then((data) => {
                this.setState({'contacttypes': data});
            })
    }

    render() {
        if(!this.state.contacttypes) {
            return(
                <div>Stand by for contact details</div>
            )
        }

        const firstName = this.state.contactDetails.firstName || '',
            lastName = this.state.contactDetails.lastName || '',
            linkedIn = this.state.contactDetails.linkedIn || '',
            email = this.state.contactDetails.email || '',
            phone = this.state.contactDetails.phone || '',
            remark = this.state.contactDetails.remark || '',
            contacttype = this.state.contactDetails.contactType || '',
            firstAndLast = `${firstName} ${lastName}`,
            firstAndLastLinkedIn = linkedIn ?
                <a href = {linkedIn} target='_blank'>{firstAndLast}</a>:
                firstAndLast;

        return(<div>
            <p>{firstAndLastLinkedIn}</p>
            <div>
                Last name:
                <input
                    type = "text"
                    value = {lastName || ''}
                    size = "20"
                    onChange = {(e) => {
                        this.onFieldChange.call(this, 'lastName', e.target.value);
                    }}
                />&nbsp;&nbsp;
                First name:
                <input
                    type = "text"
                    value = {firstName || ''}
                    size = "20"
                    onChange = {(e) => {
                        this.onFieldChange.call(this, 'firstName', e.target.value);
                    }}
                />
            </div>
            <div>
                LinkedIn:
                <input
                    type = "text"
                    value = {linkedIn || ''}
                    size = "100"
                    onChange = {(e) => {
                        this.onFieldChange.call(this, 'linkedIn', e.target.value);
                    }}
                />
            </div>
            <div>
                Email:
                <input
                    type = "text"
                    value = {email || ''}
                    size = "100"
                    onChange = {(e) => {
                        this.onFieldChange.call(this, 'email', e.target.value);
                    }}
                />
            </div>
            <div>
                Phone:
                <input
                    type = "text"
                    value = {phone || ''}
                    size = "15"
                    onChange = {(e) => {
                        this.onFieldChange.call(this, 'phone', e.target.value);
                    }}
                />
            </div>
            <div>
                Remarks:
                <input
                    type = "text"
                    value = {remark || ''}
                    size = "100"
                    onChange = {(e) => {
                        this.onFieldChange.call(this, 'remark', e.target.value);
                    }}
                />
            </div>
            <div>
                Contact type:
                <select
                    value = {contacttype}
                    onChange = {(e) => {
                        this.onFieldChange.call(this, 'contactType', parseInt(e.target.value));
                    }}
                >
                    {this.state.contacttypes.map(
                        (type, i) =>
                        <option
                            value       = {type.contactTypeID}
                            key         = {i}
                        >{type.type}</option>
                    )}
                </select>
            </div>
            <div>
                <button>{this.state.queryType} Contact</button>
            </div>
        </div>)
    }
}

module.exports = ContactDetails;