import {InputText, SubmitButton} from '../formElements';
import Ajax from '../../http/ajax';
import React, { Component } from 'react';

class AddOrEditPeripheral extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        if(this.isUpdating()) {
            const primaryKey = this.props.addOrEdit.primaryKey,
                nameProp = this.props.addOrEdit.nameProp,
                remarkProp = this.props.addOrEdit.remarkProp,

                // @FIXME this really should just be a for loop because we should only ever be getting one value.
                selectedItem = this.props.addOrEdit.optionList.filter((opt) => {
                    if(opt[primaryKey] === this.props.addOrEdit.currentValue) {
                        return opt;
                    }
                },
            );

            this.state[nameProp] = selectedItem[0][nameProp];
            this.state[remarkProp] = selectedItem[0][remarkProp]
        }
    }

    componentDidMount() {
        this.updateState({isReady: true});
    };

    updateState(newState) {
        this.setState(newState);
    }

    addPropValToState(k, v) {
        const newState = {};

        newState[k] = v;

        this.updateState(newState);
    }

    getCurrentValue(prop) {
        return this.state[prop] || '';
    }

    isUpdating() {
        return (this.props.addOrEdit.queryType === 'editingPeripheral');
    }

    handleInsertClick() {

        // @FIXME this should definitely be out in a utility function, outside of any component. We need something more abstracted to handle - so use QueryBuilder.js
        const tableQueryParams = `table=${this.props.addOrEdit.tableName}&props=${this.props.addOrEdit.nameProp},${this.props.addOrEdit.remarkProp}&values='${encodeURIComponent(this.state[this.props.addOrEdit.nameProp])}','${encodeURIComponent(this.state[this.props.addOrEdit.remarkProp])}'&updateQuery=${this.isUpdating()}&primaryKey=${this.props.addOrEdit.primaryKey}&primaryKeyValue=${this.props.addOrEdit.currentValue}`,
            url = `http://localhost:8081/insertSQL.json?${tableQueryParams}`;

        Ajax.doAjaxQuery(url).then((data) => {

            const newState = this.props.positionData,
                updateProp = this.props.addOrEdit.propName;

            newState[updateProp] = JSON.parse(data).insertId;

            this.props.updateEditPos(newState);
            this.props.positionUpdated();

        }).catch((err) => {
            console.log(err);
        });
    }

    // @FIXME this is so similar to handleInsertClick; can at least part of this be made into the same function?
    handleUpdateClick() {
        debugger;
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
                        getCurrentValue = {this.getCurrentValue.bind(this, this.props.addOrEdit.nameProp)}
                        size            = '50'
                        updateData      = {this.addPropValToState.bind(this)}
                    />
                    <InputText
                        header          = 'remarks'
                        valueStyle      = {this.props.textfieldValStyle}
                        divStyle        = {this.props.divFieldStyle}
                        propName        = {this.props.addOrEdit.remarkProp}
                        getCurrentValue = {this.getCurrentValue.bind(this, this.props.addOrEdit.remarkProp)}
                        size            = '100'
                        updateData      = {this.addPropValToState.bind(this)}
                    />
                    <SubmitButton
                        handleClick = {
                            this.isUpdating() ?
                                this.handleUpdateClick.bind(this) :
                                this.handleInsertClick.bind(this)
                        }
                        buttonText = {
                           this.isUpdating() ?
                               'Update' :
                               'Edit'
                        }
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