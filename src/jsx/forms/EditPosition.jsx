import Ajax from '../../http/ajax';
import AddOrEditPeripheral from './AddOrEditPeripheral.jsx';
import PositionForm from './PositionForm.jsx';
import React, { Component } from 'react';

class EditPosition extends Component {
    constructor(props) {
        super(props);

        this.isUnmounted = false;

        this.state = {
            dataReady: false,
            positionData: this.props.positionData || {},
            conversations: this.props.conversations || [],
            employersRecruitersEtc: {},

            // Forms will need access to this to toggle which form is displaying.
            updateEditPosState: this.updateState.bind(this)
        }
    }

    callAjax(url, resolveOnSight = false) {
        return new Promise((resolve, reject) => {
            if(resolveOnSight) {
                resolve();
            } else {
                Ajax.doAjaxQuery(url)
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }
        })
    }

    positionUpdated() {
        this.updateState({'dataReady': false});
        this.updateState({'addOrEdit': false});

        this.loadAllFormData();
    }

    isInserting() {
        return isNaN(this.props.positionID);
    }

    isEditingPeripheral() {
        return (this.state.addOrEdit ?
                true:
                false
               );
    }

    // Call this to toggle between editor view for employers, recruiters etc and the position editor view
    updateState(newState) {
        this.setState(newState);
    }

    // @TODO consider using redux and adding this to a store so there is only a need to hit all these db calls once.
    loadAllFormData() {
        const newState = {
            employers: [],
            recruiters: [],
            roleType : [],
            status: [],
            resumeVersion: []
        };

        this.callAjax('http://localhost:8081/employers.json')
            .then((data) => {
                newState.employers = JSON.parse(data);
                return this.callAjax('http://localhost:8081/recruiters.json');
            })
            .then((data) => {
                newState.recruiters = JSON.parse(data);
                return this.callAjax('http://localhost:8081/positionTypes.json');
            })
            .then((data) => {
                newState.roleType = JSON.parse(data);
                return this.callAjax('http://localhost:8081/applicationStatus.json');
            })
            .then((data) => {
                newState.status = JSON.parse(data);

                return this.callAjax('http://localhost:8081/resumeVersions.json');
            })
            .then((data) => {
                 newState.resumeVersion = JSON.parse(data);

                 return this.callAjax(`http://localhost:8081/positionData.json?posid=${this.props.positionID}`, this.isInserting());
            })
            .then((data) => {

                // If we are editing the position, then we need to  know all about the position we are editing.
                this.setState({'positionData': (data ? JSON.parse(data)[0] : this.state.positionData )});
                return this.callAjax(`http://localhost:8081/conversations.json?posid=${this.props.positionID}`, this.isInserting());
            })
            .then((data) => {

                // Conversation data.
                this.setState({'conversations': (data ? JSON.parse(data) : this.state.conversations )});
                this.setState({'employersRecruitersEtc': newState});
                this.setState({'dataReady' : true})
            })
            .catch((err) => {
                console.error(err) || console.log(err);
                // @TODO set an error state
            })

     }

    componentDidMount() {
        if(this.isUnmounted) {
            return;
        }

        this.loadAllFormData();
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    getDataNotReady() {
        return (
            <div>Standing by for data</div>
        )
    }

    showPositionModal() {

        // modal
        const modalStyle = {
            position: 'fixed',
            zIndex: 1,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            overflow: 'auto',
            backgroundColor: 'rgba(0,0,0,0.8)'
        },

       // @TODO different for mobile
        lightboxStyle = {
            backgroundColor: '#000000',
            marginLeft: '25px',
            marginTop: '25px',
            padding: '20px',
            border: '3px solid #880',
            borderRadius: '25px',
            color: '#00FFFF',
            width: '87%'
        },

        formToDisplay = this.isEditingPeripheral() ?
            <AddOrEditPeripheral
                addOrEdit           = {this.state.addOrEdit}
                positionData        = {this.state.positionData}
                updateEditPos       = {this.state.updateEditPosState}
                textfieldValStyle   = {this.props.textfieldValStyle}
                divFieldStyle       = {this.props.divFieldStyle}
                positionUpdated     = {this.positionUpdated.bind(this)}
            />:
            <PositionForm
                periphData          = {this.state}
                stateHandler        = {this.props.stateHandler}
                updateMultiState    = {this.props.updateMultiState}
                positionData        = {this.state.positionData}
                updateEditPosState  = {this.state.updateEditPosState}
                buttonStyle         = {this.props.buttonStyle}
                textfieldValStyle   = {this.props.textfieldValStyle}
                divFieldStyle       = {this.props.divFieldStyle}
                updatingPos         = {!this.isInserting()}
            />;

        return (
            <div style = {modalStyle}>
                <div style = {lightboxStyle}>
                    {formToDisplay}
                </div>
            </div>
        )
    }

    render () {
        return (this.state.dataReady || this.isEditingPeripheral()) ? this.showPositionModal() : this.getDataNotReady();
    }
}

module.exports = EditPosition;