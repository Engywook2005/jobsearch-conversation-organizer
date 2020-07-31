import Ajax from '../../../http/ajax';
import QueryBuilder from '../../../utils/QueryBuilder';
import React, { Component } from 'react'

// Gets its own submit button. We do not update ConvoViews when submitted.
// ... unless we are adding a new contact. Then we need to add the new contact id. Would at least need to kick this up
// to ConvoEdit.
// So yeah this gets its own update state handler and it should have some visual separation from everything else.
class ContactDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactDetails: this.findCurrentContact(this.props.contactList, this.props.convoData),
            processing: false
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

    handleSubmit() {
        const fieldsAndProps = this.state.contactDetails,
            queryProps = {
                'Insert': {
                    'buildQueryURL': () => {
                        return QueryBuilder.createInsertQuery('contactlist', fieldsAndProps)
                    },
                    'handleResponse': (data) => {
                        const contactID = JSON.parse(data).insertId;

                        this.state.contactDetails.contactID = contactID;
                        this.props.setNewContactID(contactID);
                        this.setState({
                                'queryType' : 'Update',
                                'processing': false
                            }
                        );
                    }
                },
                'Update': {
                    'buildQueryURL': () => {
                        return QueryBuilder.createUpdateQuery('contactlist', fieldsAndProps, {'contactID': this.props.convoData.contactID})
                    },
                    'handleResponse': (data) => {
                        this.setState({'processing': false})
                    }
                }
            },
            queryProp = queryProps[this.state.queryType];

        this.setState({'processing': true});

        Ajax.doAjaxQuery(queryProp.buildQueryURL())
            .then((data) => {
                queryProp.handleResponse(data);
            })
    }

    render() {
        if(!this.state.contacttypes) {
            return(
                <div>Stand by for contact details</div>
            )
        }

        if(this.state.processing) {
            return(
                <div>Processing. Stand by.</div>
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
                <a
                    href = {linkedIn}
                    target='_blank'
                    style={this.props.linkStyle}
                >{firstAndLast}</a>:
                firstAndLast;

        return(<div>
            <p>{firstAndLastLinkedIn}</p>
            <div
                style = {this.props.divFieldStyle}
            >
                Last name &nbsp;
                <input
                    type = "text"
                    value = {lastName || ''}
                    size = "20"
                    style = {this.props.textfieldValStyle}
                    onChange = {(e) => {
                        this.onFieldChange.call(this, 'lastName', e.target.value);
                    }}
                />&nbsp;&nbsp;
                First name &nbsp;
                <input
                    type = "text"
                    value = {firstName || ''}
                    size = "20"
                    style = {this.props.textfieldValStyle}
                    onChange = {(e) => {
                        this.onFieldChange.call(this, 'firstName', e.target.value);
                    }}
                />
            </div>
            <div
                style = {this.props.divFieldStyle}
            >
                LinkedIn &nbsp;
                <input
                    type = "text"
                    value = {linkedIn || ''}
                    size = "80"
                    style = {this.props.textfieldValStyle}
                    onChange = {(e) => {
                        this.onFieldChange.call(this, 'linkedIn', e.target.value);
                    }}
                />
            </div>
            <div
                style = {this.props.divFieldStyle}
            >
                Email &nbsp;
                <input
                    type = "text"
                    value = {email || ''}
                    size = "80"
                    style = {this.props.textfieldValStyle}
                    onChange = {(e) => {
                        this.onFieldChange.call(this, 'email', e.target.value);
                    }}
                />
            </div>
            <div
                style = {this.props.divFieldStyle}
            >
                Phone &nbsp;
                <input
                    type = "text"
                    value = {phone || ''}
                    size = "15"
                    style = {this.props.textfieldValStyle}
                    onChange = {(e) => {
                        this.onFieldChange.call(this, 'phone', e.target.value);
                    }}
                />
            </div>
            <div
                style = {this.props.divFieldStyle}
            >
                Contact type &nbsp;
                <select
                    value = {contacttype}
                    style = {this.props.textfieldValStyle}
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
            <div
                style = {this.props.divFieldStyle}
            >
                Remarks<br/>
                <textarea
                    rows = "4"
                    cols = "80"
                    value = {remark || ''}
                    style = {this.props.textfieldValStyle}
                    onChange = {(e) => {
                        this.onFieldChange.call(this, 'remark', e.target.value);
                    }}
                />
            </div>
            <div
                style = {this.props.divFieldStyle}
            >
                <button
                    onClick = {this.handleSubmit.bind(this)}
                >{this.state.queryType} Contact</button>
            </div>
        </div>)
    }
}

module.exports = ContactDetails;