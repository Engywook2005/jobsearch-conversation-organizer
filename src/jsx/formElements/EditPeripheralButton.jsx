import React, {Component} from 'react';
import FormElementBase from './FormElementBase.jsx';

// @TODO base class

class EditPeripheralButton extends FormElementBase {
    constructor(props) {
        super(props);
    }

    getButtonText() {
        return this.props.currentValue === '1' ?
            'Add' :
            'Edit'
    }

    handleClick(e) {
        const newState = {'addOrEdit': {}},
            allPropNames = Object.keys(this.props),

            // We'll need to know which we are doing when we load the form.
            addOrEdit = this.getButtonText() === 'Add' ?
                'addingPeripheral' :
                'editingPeripheral';

        allPropNames.forEach((propName) => {
            newState.addOrEdit[propName] = this.props[propName];
        })

        newState.addOrEdit.queryType = addOrEdit;

        this.props.updateEditPos(newState);

    }

    render() {

        return (

            <div style = {this.props.buttonStyle}>
                <p onClick = {this.handleClick.bind(this)}>{this.getButtonText()}</p>
            </div>
        );
    }
}

module.exports = EditPeripheralButton;