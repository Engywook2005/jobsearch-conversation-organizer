import Ajax from '../http/ajax';
import EditPosition from './positions/EditPosition.jsx';
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
            showingNewPositionTable: false,
            reloading: false // Set to true to trigger refresh of main positions table.
        };

        this.setStateHandler = this.setStateHandler.bind(this);
    }

    componentDidMount() {
        this.setStateHandler('stateHandler', this.setStateHandler);

        this.ajaxHandler(this.setStateHandler);
    }

    setStateHandler(state, value) {
        const newState = {};
        newState[state] = value;

        this.setState(newState);
    }

    // @TODO Should we have a base class for App that other can extend with overrides of ajaxHandler?
    ajaxHandler() {
        this.state.stateHandler('reloading', false);

        Ajax.doAjaxQuery('http://localhost:8081/')
            .then((data) => {
                this.state.stateHandler('positions', JSON.parse(data));
                this.state.stateHandler('greeting', 'Irons In The Fire')
            })
            .catch((err) => {
                this.state.stateHandler('greeting', `Oops: ${err}`)
            });
    }

    render() {

        // If we're expected to reload, go back to the ajax call.
        if(this.state.reloading) {
            this.ajaxHandler();
            return;
        }

        const textStyle = {
                fontFamily: "helvetica, arial",
                fontSize: "10px"
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
                            <th style = {cellStyle}>ID</th>
                            <th style = {cellStyle}>Job Title</th>
                            <th style = {cellStyle}>Employer</th>
                            <th style = {cellStyle}>Recruiter</th>
                            <th style = {cellStyle}>Role Type</th>
                            <th style = {cellStyle}>Status</th>
                            <th style = {cellStyle}>Last Status Change</th>
                            <th style = {cellStyle}>Resume Version</th>
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
    }

    createNewPos() {
        return (
            <EditPosition
                stateHandler = {this.props.stateHandler}
                positionData = {
                    {
                        employer: '1',
                        recruiter: '1',
                        applicationStatus: '1'
                    }
                }
            />
        );
    }

    render() {
        return (
            this.props.showingNewPositionTable ? this.createNewPos() : this.linkForAddNewPos()
        )
    }
}

class TableRow extends Component {

    // Props are immutable.
    render() {
        this.rowClick = (e) => {
            // @TODO create a more detailed, editable overlay about the position. Should be able to work with the same app as is used for adding a new position.

            /*

             <EditPosition
             stateHandler = {this.props.stateHandler}
             positionData = {
             {
             employer: '1' // in this case use the value associated with the clicked TableRow
             }
             }
             />
             */

            debugger;
        };

        return(
            <tr data-position-id={this.props.data.ID} onClick = {this.rowClick}>
                <td style = {this.props.cellStyle}>{this.props.data.ID}</td>
                <td style = {this.props.cellStyle}>{this.props.data.title}</td>
                <td style = {this.props.cellStyle}>{this.props.data.employerName}</td>
                <td style = {this.props.cellStyle}>{this.props.data.recruiterName}</td>
                <td style = {this.props.cellStyle}>{this.props.data.roleType}</td>
                <td style = {this.props.cellStyle}>{this.props.data.currentStatus}</td>
                <td style = {this.props.cellStyle}>{new Date(this.props.data.lastStatusChange).toDateString()}</td>
                <td style = {this.props.cellStyle}>{this.props.data.resumeVersion}</td>
            </tr>
        );
    }
}

export default App;
