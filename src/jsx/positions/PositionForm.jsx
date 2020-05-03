import {InputText, Pulldown, SubmitButton} from '../formElements';
import React, { Component } from 'react';

class PositionForm extends Component {

    // Use setstate at the level of PositionForm, should not affect App. Leave that authority to EditPosition.
    // @TODO when form is submitted or closed, call props.stateHandler and set reloading to true
    // Seems that the above two remarks are contradictory. Think calling props.stateHandler after updating database is what we want to do.
    constructor(props) {
        super(props);

        const stateKeys = Object.keys(props);

        this.state = {
            positionData: this.props.positionData || {},
            employers: this.props.periphData.employersRecruitersEtc.employers,
            recruiters: this.props.periphData.employersRecruitersEtc.recruiters
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
    // Or would it make better sense to have this in FormElementBase?
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
                borderWidth: '1px'
            };

        return (
            <div>
                <div style = {nameDataPairingStyle}>
                    <InputText
                        header                  = 'Title'
                        valueStyle              = {textfieldValStyle}
                        originalDefault         = 'Enter title here'
                        defaultValue            = {this.state.positionData.title || 'Enter title here'}
                        size                    = '50'
                        updateData              = {this.updatePositionData.bind(this)}
                        propName                = 'title'
                        getCurrentValue         = {this.getCurrentValue.bind(this)}
                    />
                    <Pulldown
                        header          = 'Employer'
                        options         = {this.state.employers}
                        defaultValue    = {this.state.positionData.employer || 0}
                        primaryKey      = 'employerID'
                        nameProp        = 'name'
                        remarkProp      = 'remarks'
                        propName        = 'employer'
                        addNew          = 'true'
                        getCurrentValue = {this.getCurrentValue.bind(this)}
                    />
                </div>
                <SubmitButton/>
            </div>
        )
    }

    // @TODO submit button
}

module.exports = PositionForm;