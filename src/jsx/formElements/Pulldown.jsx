import EditPeripheralButton from './EditPeripheralButton.jsx'
import React, {Component} from 'react';
import FormElementBase from './FormElementBase.jsx';
import InputText from './InputText.jsx';

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
        const optionsMappedToValues = {};

        let remark = '';

        // @FIXME not a good way to do this; should be able to get the positions by both key and primary key
        // Why didn't setting key to be primary key work?
        this.props.options.forEach((option) => {
            optionsMappedToValues[option[this.props.primaryKey]] = option;
        });

        if(this.props.remarkProp) {
            remark = optionsMappedToValues[this.props.defaultValue][this.props.remarkProp] || '';
        }

        return (
            <div style = {this.props.divStyle}>
                <div>{this.props.header}</div>
                <div style = {{float:'left'}}>
                    <select
                        id          = {this.randNum}
                        style       = {this.props.valueStyle}
                        onChange    = {this.updateValue.bind(this)}
                    >
                        {
                            this.props.options.map((option, i) => <Option
                                val         = {option[this.props.primaryKey]}
                                name        = {option[this.props.nameProp]}
                                key         = {i}
                            />)
                        }
                    </select>
                </div>
                <div style = {{float:'left'}}>
                    { this.props.updateEditPos ?
                        <EditPeripheralButton
                            header          = {this.props.header}
                            buttonStyle     = {this.props.buttonStyle}
                            primaryKey      = {this.props.primaryKey}
                            nameProp        = {this.props.nameProp}
                            remarkProp      = {this.props.remarkProp}
                            updateData      = {this.props.updateData}
                            updateEditPos   = {this.props.updateEditPos}
                            propName        = {this.props.propName}
                            currentValue    = {this.props.defaultValue}
                            tableName       = {this.props.tableName}
                            optionList      = {this.props.options}
                        /> :
                        <div/>
                    }
                </div>

                {
                    this.props.remarkProp ?
                        <div style = {{clear:'left'}}>
                            <p><em>{remark}</em></p>
                        </div> :
                        <div/>
                }
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