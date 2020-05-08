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
            remark = optionsMappedToValues[this.props.defaultValue][this.props.remarkProp] || 'Enter remark here';
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
                            header          = 'Add or Edit {this.props.header}'
                            buttonStyle     = {this.props.buttonStyle}
                            primaryKey      = {this.props.primaryKey}
                            nameProp        = {this.props.nameProp}
                            remarkProp      = {this.props.remarkProp}
                            updateData      = {this.props.updateData}
                            updateEditPos   = {this.props.updateEditPos}
                            propName        = {this.props.propName}
                            currentValue    = {this.props.defaultValue}
                        /> :
                        <div/>
                    }
                </div>

                {
                    // @TODO there really isn't any need to have the remarks editable. We can have the remark appear in
                    // a <p/> tag; it does make better sense to have the remarks be editable in the edit/add form.
                    this.props.remarkProp ?
                        <div style = {{clear:'left'}}>
                            <InputText
                                defaultValue    = {remark}
                                originalDefault = 'Enter remark here'
                                propName        = {this.props.remarkProp}
                                updateData      = {this.props.updateRemarks}
                                valueStyle      = {this.props.valueStyle}
                                size            = '100'
                                getCurrentValue = {
                                    () => {
                                        return remark;
                                    }
                                }
                            />
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