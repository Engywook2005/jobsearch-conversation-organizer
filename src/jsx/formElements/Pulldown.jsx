import React, {Component} from 'react';
import FormElementBase from './FormElementBase.jsx';

class Pulldown extends FormElementBase {
    constructor(props) {
        super(props);

        this.randNum = Math.floor(Math.random() * 10000000);
    }

    componentDidMount() {
        this.setPulldownValue();
    }

    componentDidUpdate() {
        this.setPulldownValue();
    }

    setPulldownValue() {
        const pulldown = document.getElementById(this.randNum);

        pulldown.value = this.props.defaultValue;
    }

    render() {
        return (
            <div>
                <div>{this.props.header}</div>
                <select id = {this.randNum}>
                    {
                        this.props.options.map((option, i) => <Option
                            val  = {option[this.props.primaryKey]}
                            name = {option[this.props.nameProp]}
                            key  = {i}
                            />)
                    }
                </select>
            </div>)
    }
}

class Option extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(<option
            value = {this.props.val}
        >{this.props.name}</option>)
    }
}

module.exports = Pulldown;