import React, { Component } from 'react';

class PositionForm extends Component {

    // Use setstate at the level of PositionForm, should not affect App. Leave that authority to EditPosition.
    // @TODO when form is submitted or closed, call props.stateHandler and set reloading to true
    // Seems that the above two remarks are contradictory. THink calling props.stateHandler after updating database is what we want to do.
    constructor(props) {
        super(props);

        const stateKeys = Object.keys(props);

        this.state = {};

        stateKeys.forEach((key) => {
            this.state[key] = this.props[key];
        });
    }

    // @ TODO abstract this out to general form function.
    getCurrentValueForTextInput(prop, myDefault) {
        return (this.state.positionData && this.state.positionData[prop]) ?
            this.state.positionData[prop] :
            myDefault;
    }

    render() {
        const nameDataPairingStyle = {
                float: 'left',
                height: '3em'
            },
            textfieldValStyle = {
                backgroundColor: '#000000',
                color: '#888800',
                borderWidth: '0px'
            };

        return (

            // @TODO different modules for each form input type.
            <div>
                <div style = {nameDataPairingStyle}>
                    <div>Title</div>
                    <div>
                        <input style = {textfieldValStyle}
                            type            = "text"
                            defaultValue    = {this.getCurrentValueForTextInput('title', 'Enter title here')}
                            size            = "50"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = PositionForm;