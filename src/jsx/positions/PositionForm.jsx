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

    // @TODO try to get to where we only need one function to update state for everything on this form. Would be helped by using redux storage?
    // Wouldn't this be used to also collect recruiter data etc?
    updateEmployerData(primaryKey, prop, val) {
        const newEmployerData = this.state.employers;

        // @TODO I think what needs to happen is we get the employer/recruiter data back as an object rather than an array.
        for(let i = 0; i < newEmployerData.length; i++) {
            if(newEmployerData[i][primaryKey] === parseInt(this.state.positionData.employer)) {
                newEmployerData[i][prop] = val;
                this.setState({employers: newEmployerData})

                break;
            }
        }
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

        // @TODO make sure all style declarations are here. Header's cyan style is elsewhere.
        // Or keep the styles in a constants file? Then no need to pass these styles down the chain.
        const nameDataPairingStyle = {
                float: 'left',
                height: '3em'
            },
            textfieldValStyle = {
                backgroundColor: '#000000',
                color: '#888800',
                borderWidth: '1px'
            },
            divStyle = {
                marginBottom: '0.5em'
            };


        return (
            <div>
                <div style = {nameDataPairingStyle}>
                    <InputText
                        class           = "formItem"
                        header          = 'Title'
                        valueStyle      = {textfieldValStyle}
                        divStyle        = {divStyle}
                        originalDefault = 'Enter title here'
                        defaultValue    = {this.state.positionData.title || 'Enter title here'}
                        size            = '50'
                        updateData      = {this.updatePositionData.bind(this)}
                        propName        = 'title'
                        getCurrentValue = {this.getCurrentValue.bind(this)}
                    />
                    <Pulldown
                        class           = "formItem"
                        header          = 'Employer'
                        options         = {this.state.employers}
                        defaultValue    = {this.state.positionData.employer || 1}
                        valueStyle      = {textfieldValStyle}
                        divStyle        = {divStyle}
                        primaryKey      = 'employerID'
                        nameProp        = 'name'
                        remarkProp      = 'remarks'
                        updateData      = {this.updatePositionData.bind(this)}
                        updateRemarks   = {(prop, val) => {
                                                this.updateEmployerData('employerID', prop, val)
                                            }
                                          }
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