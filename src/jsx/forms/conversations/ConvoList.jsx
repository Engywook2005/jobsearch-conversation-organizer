import styles from '../../../constants/styles';
import Convo from './Convo.jsx';
import React, { Component } from 'react';

class ConvoList extends Component {

    render() {
        // @TODO need to be able to add conversations as well.
        return(
            <div style = {styles.convoStyle}>
                {
                    this.props.viewProps.data.map((convo, i) =>
                        <Convo
                            convoData       = {convo}
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