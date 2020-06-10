import React, { Component } from 'react';

class FormElementBase extends Component {
    constructor(props) {
        super(props);

        this.updateData = this.props.updateData || ((propName, propValue) => {
                // NO-OP for now.
            }
        );
    }

    updateValue(e) {
        this.updateData(this.props.propName, e.target.value);
    }

    render() {
        return(<div/>)
    }
}

module.exports = FormElementBase;