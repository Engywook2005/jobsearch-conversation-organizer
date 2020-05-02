import React, { Component } from 'react';

class InputText extends Component {
    constructor(props) {
        super(props);
    }

    updateValue(e) {
        this.props.updateData(this.props.propName, e.target.value);
    }

    clearDefault(e) {
        if(e.target.value === this.props.defaultValue) {
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
            <div>Title</div>
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