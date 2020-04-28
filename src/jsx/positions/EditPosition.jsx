import Ajax from '../../http/ajax';
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
        return isNAN(this.props.positionID);
    }

    // @TODO consider using redux and adding this to a store so there is only a need to hit all these db calls once.
    loadAllFormData() {
        const newState = {
            employers: [],
            recruiters: [],
            positionType: [],
            applicationStatus: []
        };

        this.callAjax('http://localhost:8081/employers')
            .then((data) => {
                newState.employers = data;
                return this.callAjax('http://localhost:8081/recruiters');
            })
            .then((data) => {
                newState.recruiters = data;
                return this.callAjax('http://localhost:8081/positionType');
            })
            .then((data) => {
                newState.positionType = data;
                return this.callAjax('http://localhost:8081/applicationStatus');
            })
            .then((data) => {
                 newState.applicationStatus = data;
                 return this.callAjax(`http://localhost:8081/positionData?posid=${this.props.positionID}`, this.isInserting());
            })
            .then((data) => {
                this.setState({'positionData': data});
                return this.callAjax(`http://localhost:8081/conversations?posid=${this.props.positionID}`, this.isInserting());
            })
            .then(() => {
                this.setState({'employersRecruitersEtc': newState});
                this.setState({'dataReady' : true})
            })
            .catch((err) => {
                // @TODO set an error state
            })

        // @TODO retrieve employers, position types, recruiters etc and store. Would be better ultimately to put this in a redux store.

        // If we have a position id we need to load the specific position as well.

        //  Once we have everything we can load the form by setting dataReady to true
     }

    componentDidMount() {
        this.loadAllFormData();
    }

    getDataNotReady() {
        return (
            <div>Standing by for data</div>
        )
    }

    getDataReady() {
        return (
            <div>Ready for the good stuff</div>
        )
    }

    render () {
        return this.state.dataReady ? this.getDataReady() : this.getDataNotReady();
    }
}

module.exports = EditPosition;