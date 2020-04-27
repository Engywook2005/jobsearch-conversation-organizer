import Ajax from '../http/ajax';
import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();

        // State is mutable.
        this.state = {
            positions: [
            ],
            positionDetails: {},
            greeting: "Job Convos data loading",
            stateHandler: () => {},
            showingNewPositionTable: false
        };

        this.setStateHandler = this.setStateHandler.bind(this);
    }

    componentDidMount() {
        this.setStateHandler('stateHandler', this.setStateHandler);

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
                stateHandler('positions', JSON.parse(data));
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
                <Header greeting = {this.state.greeting}
                        stateHandler = {this.state.stateHandler}
                        positionDetails = {this.state.positionDetails}
                        showingNewPositionTable = {this.state.showingNewPositionTable}
                />
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
                        this.state.positions.map((position, i) => <TableRow
                            stateHandler = {this.state.stateHandler}
                            positionDetails = {this.state.positionDetails}
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
        return (
            <div>
                <p>{this.props.greeting}</p>
                <AddNewPos
                    stateHandler = {this.props.stateHandler}
                    positionDetails = {this.props.positionDetails}
                    showingNewPositionTable = {this.props.showingNewPositionTable}
                />
            </div>
        );
    }
}

class AddNewPos extends Component {

    handleAddNewPosClick() {
        this.props.stateHandler('showingNewPositionTable', true)
    }

    linkForAddNewPos() {
        return (
            <p onClick = {this.handleAddNewPosClick.bind(this)}>Click to add a new position</p>
        );
    };

    render() {
        return (
            this.props.showingNewPositionTable ? <span>table will go here</span> : this.linkForAddNewPos()
        )
    }
}

class TableRow extends Component {

    // Props are immutable.
    render() {
        this.rowClick = (e) => {
            // @TODO create a more detailed, editable overlay about the position. Should be able to work with the same app as is used for adding a new position.


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
