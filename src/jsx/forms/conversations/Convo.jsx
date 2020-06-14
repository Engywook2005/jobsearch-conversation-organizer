import styles from '../../../constants/styles';
import React, { Component } from 'react';
import Time from '../../../utils/Time';

class Convo extends Component {
    render() {

        const firstAndLast = <div><strong>{this.props.convoData.firstName} {this.props.convoData.lastName}</strong></div>,
            convoTime = <div>{new Date(this.props.convoData.convoDate).toDateString()} {this.props.convoData.convoTime}</div>,
            outputDiv = (
                <div style = {styles.singleConvoStyle}>
                    {firstAndLast}
                    {convoTime}
                </div>
            );

        return outputDiv;
    }
}

module.exports = Convo;