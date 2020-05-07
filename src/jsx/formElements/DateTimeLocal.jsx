import FormElementBase from './FormElementBase.jsx';
import React from 'react';
import TimeUtils from '../../utils/Time';

class DateTimeLocal extends FormElementBase {
    constructor(props) {
        super(props);

        this.defaultValue = this.props.defaultValue || new Date();
    }

    render() {
        return (
            <div style = {this.props.divStyle}>
                <div>{this.props.header}</div>
                <div>
                    <input
                        style               = {this.props.valueStyle}
                        type                = "datetime-local"
                        value               = {TimeUtils.getDateForForm(this.props.getCurrentValue(this.props.propName, this.defaultValue))}
                        size                = {this.props.size}
                        onChange            = {this.updateValue.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

module.exports = DateTimeLocal;