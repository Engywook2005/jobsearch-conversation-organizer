import React, {Component} from 'react';
import FormElementBase from './FormElementBase.jsx';

class EditPeripheralBugtton extends FormElementBase {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style = {this.props.buttonStyle}>
                <p>Button!</p>
            </div>
        );
    }
}

module.exports = EditPeripheralBugtton;