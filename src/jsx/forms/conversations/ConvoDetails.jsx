import React, { Component } from 'react';
import Time from '../../../utils/Time'

class ConvoDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const convoData = this.props.convoData,
            currentTime = Time.getDateForForm(new Date()),
            convoDate = (convoData.conversationDate || currentTime).split('T')[0],
            convoTime = convoData.conversationTime || currentTime.split('T')[1];

        return(<div>
            <div>
                <div>
                    Date:&nbsp;&nbsp;
                    <input
                        type="date"
                        value={convoDate}
                    />
                    &nbsp;&nbsp;Time:&nbsp;&nbsp;
                    <input
                        type="time"
                        value={convoTime}
                    />
                </div>
                <div>
                    Conversation Type&nbsp;&nbsp;
                    <select
                        value = {convoData.conversationType || 1}
                    >
                        {this.props.convoTypes.map((convoType, i) =>
                            <option
                                value = {convoType.conversationTypeID}
                                key = {i}
                            >{convoType.type}</option>)
                        }
                    </select>
                </div>
                <div>
                    Remarks<br/>
                    <textarea
                        rows = "4"
                        cols = "80"
                    >{convoData.remark || ''}</textarea>
                </div>
            </div>
        </div>);
    }
}

module.exports = ConvoDetails;