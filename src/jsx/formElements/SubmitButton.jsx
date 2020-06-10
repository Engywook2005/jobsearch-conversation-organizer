import React, { Component } from 'react';

class SubmitButton extends Component {
    render() {
        return (
            <div>
                <button
                    type = "button"
                    onClick = {this.props.handleClick}
                >{this.props.buttonText}</button>
            </div>
        );
    }
}

module.exports = SubmitButton;