import Ajax from '../http/ajax';
import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();

        // State is mutable.
        this.state = {
            data: [
            ],
            greeting: "Job Convos data loading"
        };

        this.setStateHandler = this.setStateHandler.bind(this);

        // @TODO should be called in componentDidMount
        this.ajaxHandler(this.setStateHandler, 'http://localhost:8081/');
    }

    setStateHandler(state, value) {
        const newState = {};
        newState[state] = value;

        this.setState(newState);
    }

    // @TODO Should we have a base class for App that other can extend with overrides of ajaxHandler?
    ajaxHandler(stateHandler, url) {
        Ajax.doAjaxQuery(url)
            .then((data) => {
                stateHandler('data', JSON.parse(data));
                stateHandler('greeting', 'Irons In The Fire')
            })
            .catch((err) => {
                stateHandler('greeting', `Oops: ${err}`)
            });
    }

    render() {

        const textStyle = {
                fontFamily: "helvetica, arial"
            },
            tableStyle = {
                width: "100%"
            },
            cellStyle = {
                borderWidth: '1px',
                borderColor: '#ffffff',
                borderStyle: 'solid',
                borderCollapse: 'collapse',
                padding: '5px',
                margin: '0px',
                textAlign: 'left'
            };

        return(
            <div style = {textStyle}>
                <Header greeting = {this.state.greeting} />
                <table style = {tableStyle}>
                    <tbody>
                        <tr>
                            <th style = {cellStyle}>Job Title</th>
                            <th style = {cellStyle}>Employer</th>
                            <th style = {cellStyle}>Status</th>
                            <th style = {cellStyle}>Last Status Change</th>
                        </tr>
                    {
                        // Here nodes of this.states.data become props in TableRow.
                        this.state.data.map((position, i) => <TableRow
                            cellStyle = {cellStyle}
                            key = {i}
                            data = {position}
                        />)
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

class Header extends Component {
    render() {
        return(
            <p>{this.props.greeting}</p>
        );
    }
}

class TableRow extends Component {

    // Props are immutable.
    render() {
        this.rowClick = (e) => {
            // @TODO create a more detailed, editable overlay about the position, including conversations and such. Use React.createElement?

            debugger;
        };

        return(
            <tr data-position-id={this.props.data.ID} onClick = {this.rowClick}>
                <td style = {this.props.cellStyle}>{this.props.data.title}</td>
                <td style = {this.props.cellStyle}>{this.props.data.employerName}</td>
                <td style = {this.props.cellStyle}>{this.props.data.currentStatus}</td>
                <td style = {this.props.cellStyle}>{new Date(this.props.data.lastStatusChange).toDateString()}</td>
            </tr>
        );
    }
}

export default App;
