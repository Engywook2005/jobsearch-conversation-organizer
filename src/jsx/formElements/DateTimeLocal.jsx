import React from 'react';
import FormElementBase from './FormElementBase.jsx';

class DateTimeLocal extends FormElementBase {
    constructor(props) {
        super(props);

        this.defaultValue = this.props.defaultValue || new Date();
    }

    getFormattedDate(date) {
        date = (typeof date === 'string') ? new Date(date) : date;

        const formatMonth = (dateObj) => {
                const month = dateObj.getMonth() + 1,
                    monthString = month < 10 ? `0${month}` : `${month}`;

                return monthString;
            },
            formatDateTimeStamp = function(ts) {
                return ts < 10 ? `0${ts}` : `${ts}`;
            };

        return `${date.getFullYear()}-${formatMonth(date)}-${formatDateTimeStamp(date.getDate())}T${formatDateTimeStamp(date.getHours())}:${formatDateTimeStamp(date.getMinutes())}`
    }

    render() {
        return (
            <div style = {this.props.divStyle}>
                <div>{this.props.header}</div>
                <div>
                    <input
                        style               = {this.props.valueStyle}
                        type                = "datetime-local"
                        value               = {this.getFormattedDate(this.props.getCurrentValue(this.props.propName, this.defaultValue))}
                        size                = {this.props.size}
                        onChange            = {this.updateValue.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

module.exports = DateTimeLocal;