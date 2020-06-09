import {DateTimeLocal, InputText, Pulldown, SubmitButton} from '../formElements';
import Ajax from '../../http/ajax';
import React, { Component } from 'react';
import TimeUtils from '../../utils/Time';
import QueryBuilder from '../../utils/QueryBuilder';

// @TODO add position-level remark

class PositionForm extends Component {

    // Use setstate at the level of PositionForm, should not affect App. Leave that authority to EditPosition.
    // TODO when form is submitted or closed, call props.stateHandler and set reloading to true
    // Seems that the above two remarks are contradictory. Think calling props.stateHandler after updating database is what we want to do.
    constructor(props) {
        super(props);

        const stateKeys = Object.keys(props);

        this.state = {

            // @TODO seems likely we don't need this next line. Or more likely don't need the stateKeys iterator.
            positionData: this.props.positionData || {},
            employers: this.props.periphData.employersRecruitersEtc.employers,
            recruiters: this.props.periphData.employersRecruitersEtc.recruiters,
            status: this.props.periphData.employersRecruitersEtc.status,
            roleType: this.props.periphData.employersRecruitersEtc.roleType,
            resumeVersions: this.props.periphData.employersRecruitersEtc.resumeVersion
        };

        // @TODO still think we need to do this?
        stateKeys.forEach((key) => {
            this.state[key] = this.props[key];
        });
    }

    // @TODO ultimately we will want to put this in a redux store so data will persist even if user exits the form.
    updatePositionData(prop, val) {

        // Update time of lastStatusChange if updating application status.
        if(prop === 'status') {
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

    handleSubmit() {
        const queryURL = this.props.updatingPos ?
            QueryBuilder.createUpdateQuery('specificposition', this.props.positionData, {'positionID': this.props.positionData.positionID}) :
            QueryBuilder.createInsertQuery('specificposition', this.props.positionData);

        // @TODO can we also centralize all ajax insert calls? Here's the thing: In a lot of cases, we need to know the id of the last thing we've inserted. Here, we don't.

        Ajax.doAjaxQuery(queryURL).then((data) => {
            console.log('done');

            const resetState = this.props.getPristineState();
            resetState.reloading = true;
            resetState.positionID = 0;

            this.props.updateMultiState(resetState);

        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <div>
                    <InputText
                        class           = "formItem"
                        header          = 'Title'
                        valueStyle      = {this.props.textfieldValStyle}
                        divStyle        = {this.props.divFieldStyle}
                        originalDefault = 'Enter title here'
                        defaultValue    = {this.state.positionData.title || 'Enter title here'}
                        size            = '50'
                        updateData      = {this.updatePositionData.bind(this)}
                        propName        = 'title'
                        getCurrentValue = {this.getCurrentValue.bind(this)}
                    />
                    <InputText
                        class           = "formItem"
                        header          = 'Link'
                        valueStyle      = {this.props.textfieldValStyle}
                        divStyle        = {this.props.divFieldStyle}
                        originalDefault = 'Link to job description'
                        defaultValue    = {this.state.positionData.link || 'Link to job description'}
                        size            = '50'
                        updateData      = {this.updatePositionData.bind(this)}
                        propName        = 'link'
                        getCurrentValue = {this.getCurrentValue.bind(this)}
                    />
                    <Pulldown
                        class           = "formItem"
                        header          = 'Employer'
                        tableName       = 'employer'
                        options         = {this.state.employers}
                        defaultValue    = {this.state.positionData.employer || 1}
                        valueStyle      = {this.props.textfieldValStyle}
                        divStyle        = {this.props.divFieldStyle}
                        buttonStyle     = {this.props.buttonStyle}
                        primaryKey      = 'employerID'
                        nameProp        = 'name'
                        remarkProp      = 'remarks'
                        updateData      = {this.updatePositionData.bind(this)}
                        updateEditPos   = {this.props.updateEditPosState}
                        updateRemarks   = {(prop, val) => {
                                                this.updatePeripheralTables('employers', 'employer', 'employerID', prop, val)
                                            }
                                          }
                        propName        = 'employer'
                        getCurrentValue = {this.getCurrentValue.bind(this)}
                    />
                    <Pulldown
                        class           = "formItem"
                        header          = 'Recruiter'
                        tableName       = 'recruiter'
                        options         = {this.state.recruiters}
                        defaultValue    = {this.state.positionData.recruiter || 1}
                        valueStyle      = {this.props.textfieldValStyle}
                        divStyle        = {this.props.divFieldStyle}
                        buttonStyle     = {this.props.buttonStyle}
                        primaryKey      = 'recruiterID'
                        nameProp        = 'name'
                        remarkProp      = 'remarks'
                        updateData      = {this.updatePositionData.bind(this)}
                        updateEditPos   = {this.props.updateEditPosState}
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
                        options         = {this.state.roleType}
                        defaultValue    = {this.state.positionData.roleType || 1}
                        valueStyle      = {this.props.textfieldValStyle}
                        divStyle        = {this.props.divFieldStyle}
                        primaryKey      = 'roleTypeID'
                        nameProp        = 'type'
                        updateData      = {this.updatePositionData.bind(this)}
                        propName        = 'roleType'
                        getCurrentValue = {this.getCurrentValue.bind(this)}
                    />
                    <Pulldown
                        class           = "formItem"
                        header          = 'Application Status'
                        options         = {this.state.status}
                        defaultValue    = {this.state.positionData.status || 1}
                        valueStyle      = {this.props.textfieldValStyle}
                        divStyle        = {this.props.divFieldStyle}
                        primaryKey      = 'applicationStatusID'
                        nameProp        = 'status'
                        updateData      = {this.updatePositionData.bind(this)}
                        propName        = 'status'
                        getCurrentValue = {this.getCurrentValue.bind(this)}
                    />
                    <DateTimeLocal
                        class           = "formItem"
                        header          = 'Last status update'
                        valueStyle      = {this.props.textfieldValStyle}
                        divStyle        = {this.props.divFieldStyle}
                        defaultValue    = {this.state.positionData.lastStatusChange}
                        updateData      = {this.updatePositionData.bind(this)}
                        propName        = 'lastStatusChange'
                        getCurrentValue = {this.getCurrentValue.bind(this)}
                    />
                    <Pulldown
                        class           = "formItem"
                        header          = 'Resume Versions'
                        tableName       = 'resumeVersions'
                        options         = {this.state.resumeVersions}
                        defaultValue    = {this.state.positionData.resumeVersion || 1}
                        valueStyle      = {this.props.textfieldValStyle}
                        divStyle        = {this.props.divFieldStyle}
                        buttonStyle     = {this.props.buttonStyle}
                        primaryKey      = 'resumeVersionID'
                        nameProp        = 'resumeVersionTag'
                        remarkProp      = 'resumeRemarks'
                        updateData      = {this.updatePositionData.bind(this)}
                        updateEditPos   = {this.props.updateEditPosState}
                        updateRemarks   = {(prop, val) => {
                                                this.updatePeripheralTables('resumeVersions', 'resumeVersion', 'resumeVersionID', prop, val)
                                            }
                                        }
                        propName        = 'resumeVersion'
                        getCurrentValue = {this.getCurrentValue.bind(this)}
                    />
                    <InputText
                        class           = "formItem"
                        header          = 'Duration if contractor role'
                        valueStyle      = {this.props.textfieldValStyle}
                        divStyle        = {this.props.divFieldStyle}
                        originalDefault = ''
                        defaultValue    = {this.state.positionData.durationInWeeks || ''}
                        size            = '3'
                        updateData      = {this.updatePositionData.bind(this)}
                        propName        = 'durationInWeeks'
                        getCurrentValue = {this.getCurrentValue.bind(this)}
                    />
                    <InputText
                        class           = "formItem"
                        header          = 'Remarks'
                        valueStyle      = {this.props.textfieldValStyle}
                        divStyle        = {this.props.divFieldStyle}
                        originalDefault = 'Enter any position remarks here'
                        defaultValue    = {this.state.positionData.remarks || 'Enter any position remarks here'}
                        size            = '50'
                        updateData      = {this.updatePositionData.bind(this)}
                        propName        = 'remarks'
                        getCurrentValue = {this.getCurrentValue.bind(this)}
                    />
                </div>
                <SubmitButton
                    handleClick         = {this.handleSubmit.bind(this)}
                    buttonText          = {this.props.updatingPos ? 'Update Position Details' : 'Add New Position' }
                />
            </div>
        )
    }
}

module.exports = PositionForm;