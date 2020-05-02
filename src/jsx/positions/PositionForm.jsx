import {InputText} from '../formElements';
import React, { Component } from 'react';

class PositionForm extends Component {

    // Use setstate at the level of PositionForm, should not affect App. Leave that authority to EditPosition.
    // @TODO when form is submitted or closed, call props.stateHandler and set reloading to true
    // Seems that the above two remarks are contradictory. THink calling props.stateHandler after updating database is what we want to do.
    constructor(props) {
        super(props);

        const stateKeys = Object.keys(props);

        this.state = {
            positionData: this.props.positionData || {}
        };

        stateKeys.forEach((key) => {
            this.state[key] = this.props[key];
        });
    }

    // @TODO ultimately we will want to put this in a redux store so data will persist even if user exits the form.
    updatePositionData(prop, val) {
        const newPositionData = this.state.positionData;

        newPositionData[prop] = val;

        this.setState({positionData : newPositionData});
    }



    // @ TODO abstract this out to general form function.
    getCurrentValue(prop, myDefault) {
        const returnValue = (this.state.positionData[prop] || this.state.positionData[prop] === "") ?
            this.state.positionData[prop] :
            myDefault;

        return returnValue;
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
                    <InputText
                        valueStyle              = {textfieldValStyle}
                        defaultValue            = 'Enter title here'
                        size                    = '50'
                        updateData              = {this.updatePositionData.bind(this)}
                        propName                = 'title'
                        getCurrentValue         = {this.getCurrentValue.bind(this)}
                    />
                </div>
            </div>
        )
    }

    // @TODO submit button
}

module.exports = PositionForm;