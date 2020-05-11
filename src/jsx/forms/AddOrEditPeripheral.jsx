import {InputText, SubmitButton} from '../formElements';
import Ajax from '../../http/ajax';
import React, { Component } from 'react';

class AddOrEditPeripheral extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        if(this.isUpdating()) {
            // @TODO - Ajax to pull data from current peripheral table id, then set state with it to fill in form.
        } else {
            this.updateState({isReady: true});
        }
    };

    updateState(newState) {
        this.setState(newState);
    }

    addPropValToState(k, v) {
        const newState = {};

        newState[k] = v;

        this.updateState(newState);
    }

    getCurrentValue() {
        return this.state[this.props.addOrEdit.nameProp] || '';
    }

    isUpdating() {
        return (this.props.addOrEdit.queryType === 'editingPeripheral');
    }

    getForm() {
        return(
            this.state.isReady ?
                <div>
                    <InputText
                        header          = {this.props.addOrEdit.propName}
                        valueStyle      = {this.props.textfieldValStyle}
                        divStyle        = {this.props.divFieldStyle}
                        propName        = {this.props.addOrEdit.nameProp}
                        getCurrentValue = {this.getCurrentValue.bind(this)}
                        size            = '50'
                        updateData      = {this.addPropValToState.bind(this)}
                    />
                </div> :
                <div/>
        );
    }


    render() {
        return(
            <div>
                <p>
                    <strong>
                        { !this.isUpdating() ?
                            'Add' :
                            'Update'
                        }
                        {` ${this.props.addOrEdit.header.toLowerCase()}`}
                    </strong>
                </p>
                <div>{this.getForm()}</div>
            </div>
        );
    }
}

module.exports = AddOrEditPeripheral;