import {DateTimeLocal, InputText, Pulldown, SubmitButton} from '../formElements';
import React, { Component } from 'react';
import TimeUtils from '../../utils/Time';

class PositionForm extends Component {

    // Use setstate at the level of PositionForm, should not affect App. Leave that authority to EditPosition.
    // @TODO when form is submitted or closed, call props.stateHandler and set reloading to true
    // Seems that the above two remarks are contradictory. Think calling props.stateHandler after updating database is what we want to do.
    constructor(props) {
        super(props);

        const stateKeys = Object.keys(props);

        this.state = {

            // @TODO seems likely we don't need this next line. Or more likely don't need the stateKeys iterator.
            positionData: this.props.positionData || {},

            employers: this.props.periphData.employersRecruitersEtc.employers,
            recruiters: this.props.periphData.employersRecruitersEtc.recruiters,
            applicationStatus: this.props.periphData.employersRecruitersEtc.applicationStatus,
            positionType: this.props.periphData.employersRecruitersEtc.positionType
        };

        // @TODO still think we need to do this?
        stateKeys.forEach((key) => {
            this.state[key] = this.props[key];
        });
    }

    // @TODO ultimately we will want to put this in a redux store so data will persist even if user exits the form.
    updatePositionData(prop, val) {

        // Update time of lastStatusChange if updating application status.
        if(prop === 'applicationStatus') {
            this.updatePositionData('lastStatusChange', TimeUtils.getDateForForm(new Date()));
        }

        const newPositionData = this.state.positionData;

        newPositionData[prop] = val;

        this.setState({positionData : newPositionData});
    }

    // @FIXME gives me a case of the uggles, so it does
    // @TODO why isn't this wiping the default text when clicking the element?
    updatePeripheralTables(table, positionVar, primaryKey, prop, val) {
        const newPeripheralData = this.state[table];

        // @TODO I think what needs to happen is we get the employer/recruiter data back as an object rather than an array.
        for(let i = 0; i < newPeripheralData.length; i++) {
            if(newPeripheralData[i][primaryKey] === parseInt(this.state.positionData[positionVar])) {
                newPeripheralData[i][prop] = val;

                const newState = {};
                newState[table] = newPeripheralData;

                this.setState(newState);

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
        const textfieldValStyle = {
                backgroundColor: '#000000',
                color: '#888800',
                borderWidth: '1px',
                marginTop: '0.5em'
            },
            divFieldStyle = {
                marginBottom: '1em'
            };

        return (
            <div>
                <div>
                    <InputText
                        class           = "formItem"
                        header          = 'Title'
                        valueStyle      = {textfieldValStyle}
                        divStyle        = {divFieldStyle}
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
                        divStyle        = {divFieldStyle}
                        primaryKey      = 'employerID'
                        nameProp        = 'name'
                        remarkProp      = 'remarks'
                        updateData      = {this.updatePositionData.bind(this)}
                        updateRemarks   = {(prop, val) => {
                                                this.updatePeripheralTables('employers', 'employer', 'employerID', prop, val)
                                            }
                                          }
                        propName        = 'employer'
                        addNew          = 'true'
                        getCurrentValue = {this.getCurrentValue.bind(this)}
                    />
                    <Pulldown
                        class           = "formItem"
                        header          = 'Recruiter'
                        options         = {this.state.recruiters}
                        defaultValue    = {this.state.positionData.recruiter || 1}
                        valueStyle      = {textfieldValStyle}
                        divStyle        = {divFieldStyle}
                        primaryKey      = 'recruiterID'
                        nameProp        = 'name'
                        remarkProp      = 'remarks'
                        updateData      = {this.updatePositionData.bind(this)}
                        updateRemarks   = {(prop, val) => {
                                                this.updatePeripheralTables('recruiters', 'recruiter', 'recruiterID', prop, val)
                                            }
                                          }
                        propName        = 'recruiter'
                        addNew          = 'true'
                        getCurrentValue = {this.getCurrentValue.bind(this)}
                    />
                    <Pulldown
                        class           = "formItem"
                        header          = 'Position Type'
                        options         = {this.state.positionType}
                        defaultValue    = {this.state.positionData.positionType || 1}
                        valueStyle      = {textfieldValStyle}
                        divStyle        = {divFieldStyle}
                        primaryKey      = 'roleTypeID'
                        nameProp        = 'type'
                        updateData      = {this.updatePositionData.bind(this)}
                        propName        = 'positionType'
                        getCurrentValue = {this.getCurrentValue.bind(this)}
                    />
                    <Pulldown
                        class           = "formItem"
                        header          = 'Application Status'
                        options         = {this.state.applicationStatus}
                        defaultValue    = {this.state.positionData.applicationStatus || 1}
                        valueStyle      = {textfieldValStyle}
                        divStyle        = {divFieldStyle}
                        primaryKey      = 'applicationStatusID'
                        nameProp        = 'status'
                        updateData      = {this.updatePositionData.bind(this)}
                        propName        = 'applicationStatus'
                        getCurrentValue = {this.getCurrentValue.bind(this)}
                    />
                    <DateTimeLocal
                        class           = "formItem"
                        header          = 'Last status update'
                        valueStyle      = {textfieldValStyle}
                        divStyle        = {divFieldStyle}
                        defaultValue    = {this.state.positionData.lastStatusChange}
                        updateData      = {this.updatePositionData.bind(this)}
                        propName        = 'lastStatusChange'
                        getCurrentValue = {this.getCurrentValue.bind(this)}
                    />
                </div>
                <SubmitButton/>
            </div>
        )
    }
}

module.exports = PositionForm;