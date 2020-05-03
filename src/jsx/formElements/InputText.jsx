import React from 'react';
import FormElementBase from './FormElementBase.jsx';

class InputText extends FormElementBase {
    constructor(props) {
        super(props);
    }

    clearDefault(e) {
        if(e.target.value === this.props.originalDefault) {
            this.updateValue({
                target: {
                    value: ''
                }
            })
        }
    }

    render() {
        return (
        <div>
            <div>{this.props.header}</div>
            <div>
                <input
                    style               = {this.props.valueStyle}
                    type                = "text"
                    value               = {this.props.getCurrentValue(this.props.propName, this.props.defaultValue)}
                    size                = {this.props.size}
                    onChange            = {this.updateValue.bind(this)}
                    onClick             = {this.clearDefault.bind(this)}
                />
            </div>
        </div>
        );
    }
}

module.exports = InputText;