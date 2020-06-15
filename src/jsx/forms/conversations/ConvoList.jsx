import styles from '../../../constants/styles';
import Convo from './Convo.jsx';
import React, { Component } from 'react';

class ConvoList extends Component {

    handleAddConvoClick(e) {
        this.props.viewProps.updateFunction.changeView('convoEdit', null);
    }

    render() {
        return(
            <div style = {styles.convoStyle}>
                <p><span
                    style = {styles.buttonStyle}
                    onClick = {this.handleAddConvoClick.bind(this)}
                >Add new conversation</span></p>
                {
                    this.props.viewProps.data.map((convo, i) =>
                        <Convo
                            convoData       = {convo}
                            posID           = {this.props.posID}
                            updateFunction  = {this.props.viewProps.updateFunction}
                            key             = {i}
                        />
                    )
                }
            </div>
        );
    }
}

module.exports = ConvoList;