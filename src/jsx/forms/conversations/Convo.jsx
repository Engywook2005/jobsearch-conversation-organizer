import styles from '../../../constants/styles';
import React, { Component } from 'react';

class Convo extends Component {

    handleConvoClick(e) {
        debugger;
    }

    render() {
        const nameAndRole = <div><strong>{this.props.convoData.firstName} {this.props.convoData.lastName}</strong>: {this.props.convoData.contactRole}</div>,
            convoTimeAndType = <div>{new Date(this.props.convoData.convoDate).toDateString()} {this.props.convoData.convoTime} | {this.props.convoData.convoType} </div>,
            convoRemarks = <div style={styles.remarkStyle}>{this.props.convoData.convoRemark}</div>,
            outputDiv = (
                <div
                    style = {styles.singleConvoStyle}
                    onClick = {this.handleConvoClick.bind(this)}
                >
                    {nameAndRole}
                    {convoTimeAndType}
                    {convoRemarks}
                </div>
            );

        return outputDiv;
    }
}

module.exports = Convo;