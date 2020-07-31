import React, { Component } from 'react';
import Time from '../../../utils/Time'

class ConvoDetails extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const newState = {
            currentConvoData: this.props.convoData
        },
            prop = e.target.getAttribute('data-prop'),
            timeStamp = this.getDateTime();

        newState.currentConvoData[prop] = e.target.value;

        // Set date and time if not explicit.
        if(prop !== 'conversationDate') {
            newState.currentConvoData.conversationDate = timeStamp.convoDate;
        }

        if(prop !== 'conversationTime') {
            newState.currentConvoData.conversationTime = timeStamp.convoTime;
        }

        this.props.updateState(newState, false);
    }

    getDateTime() {
        const convoData = this.props.convoData,
            currentTime = Time.getDateForForm(new Date()),
            convoDate = (convoData.conversationDate || currentTime).split('T')[0],
            convoTime = convoData.conversationTime || currentTime.split('T')[1];

        return {
            convoDate: convoDate,
            convoTime: convoTime
        }
    }

    render() {
        const convoData = this.props.convoData,
            convoDate = this.getDateTime().convoDate,
            convoTime = this.getDateTime().convoTime;

        return(<div>
            <div>
                <div
                    style = {this.props.divFieldStyle}
                >
                    Date&nbsp;
                    <input
                        type="date"
                        value={convoDate}
                        style = {this.props.textfieldValStyle}
                        data-prop="conversationDate"
                        onChange={this.handleChange}
                    />
                    &nbsp;Time&nbsp;
                    <input
                        type="time"
                        value={convoTime}
                        style = {this.props.textfieldValStyle}
                        data-prop="conversationTime"
                        onChange={this.handleChange}
                    />
                </div>
                <div
                    style = {this.props.divFieldStyle}
                >
                    Conversation Type&nbsp;
                    <select
                        value = {convoData.conversationType || 1}
                        style = {this.props.textfieldValStyle}
                        data-prop="conversationType"
                        onChange={this.handleChange}
                    >
                        {this.props.convoTypes.map((convoType, i) =>
                            <option
                                value = {convoType.conversationTypeID}
                                key = {i}
                            >{convoType.type}</option>)
                        }
                    </select>
                </div>
                <div
                    style = {this.props.divFieldStyle}
                >
                    Remarks<br/>
                    <textarea
                        rows = "4"
                        cols = "80"
                        value = {convoData.remark || ''}
                        style = {this.props.textfieldValStyle}
                        data-prop="remark"
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        </div>);
    }
}

module.exports = ConvoDetails;