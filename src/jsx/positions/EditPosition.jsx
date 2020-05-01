import Ajax from '../../http/ajax';
import PositionForm from './PositionForm.jsx';
import React, { Component } from 'react';

class EditPosition extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataReady: false,
            positionData: {},
            employersRecruitersEtc: {},
            conversations: []
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

    isInserting() {
        return isNaN(this.props.positionID);
    }

    // @TODO consider using redux and adding this to a store so there is only a need to hit all these db calls once.
    loadAllFormData() {
        const newState = {
            employers: [],
            recruiters: [],
            positionType: [],
            applicationStatus: []
        };

        this.callAjax('http://localhost:8081/employers.json')
            .then((data) => {
                newState.employers = data;
                return this.callAjax('http://localhost:8081/recruiters.json');
            })
            .then((data) => {
                newState.recruiters = data;
                return this.callAjax('http://localhost:8081/positionTypes.json');
            })
            .then((data) => {
                newState.positionType = data;
                return this.callAjax('http://localhost:8081/applicationStatus.json');
            })
            .then((data) => {

                 // @TODO add query and handle positionData for reviewing and editing a pre-existing position
                 newState.applicationStatus = data;
                 return this.callAjax(`http://localhost:8081/positionData.json?posid=${this.props.positionID}`, this.isInserting());
            })
            .then((data) => {

                // @TODO add query and handle conversations for reviewing and editing conversations, and adding new conversations for a specific position.
                this.setState({'positionData': data});
                return this.callAjax(`http://localhost:8081/conversations.json?posid=${this.props.positionID}`, this.isInserting());
            })
            .then(() => {
                this.setState({'employersRecruitersEtc': newState});
                this.setState({'dataReady' : true})
            })
            .catch((err) => {
                console.error(err) || console.log(err);
                // @TODO set an error state
            })

     }

    componentDidMount() {
        this.loadAllFormData();
    }

    getDataNotReady() {
        return (
            <div>Standing by for data</div>
        )
    }

    showPositionModal() {

        // modal
        const divStyle = {
            position: 'fixed',
            zIndex: 1,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            overflow: 'auto',
            backgroundColor: 'rgba(0,0,0,0.8)'
        },
        lightboxStyle = {
            backgroundColor: '#000000',
            marginLeft: '5%',
            marginTop: '5%',
            padding: '20px',
            border: '3px solid #880',
            borderRadius: '25px',
            color: '#00FFFF',
            width: '85%',
            height: '300px'
        };

        return (
            <div style = {divStyle}>
                <div style = {lightboxStyle}>
                    <PositionForm
                        periphData = {this.state}
                        stateHandler = {this.props.stateHandler}
                    />
                </div>
            </div>
        )
    }

    render () {
        return this.state.dataReady ? this.showPositionModal() : this.getDataNotReady();
    }
}

module.exports = EditPosition;