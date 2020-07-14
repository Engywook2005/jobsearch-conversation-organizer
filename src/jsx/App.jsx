import styles from '../constants/styles';
import Ajax from '../http/ajax';
import EditPosition from './forms/EditPosition.jsx';
import PositionFilterTool from './forms/filters/PositionFilterTool.jsx';
import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();

        // @TODO move all other style shit up here, use constants for colors.
        // State is mutable.

        this.setStateHandler = this.setStateHandler.bind(this);
        this.updateMultiState = this.updateMultiState.bind(this);

        this.state = this.getPristineState();
    }

    getPristineState() {
        this.state = {};

        return {
            positions: [],
            positionDetails: {},
            greeting: "Job Convos data loading",
            stateHandler: this.setStateHandler,
            showingNewPositionTable: false,
            reloading: false,
            textfieldValStyle: {
                backgroundColor: '#000000',
                color: '#888800',
                borderWidth: '1px',
                marginTop: '0.5em'
            },
            divFieldStyle: {
                marginBottom: '1em',
                clear: 'left'
            },
            linkStyle: {
                color: '#888800'
            }
        };
    }

    componentDidMount() {
        this.ajaxHandler(this.setStateHandler);
    }

    // @TODO need to handle more than one state change at a time.
    setStateHandler(state, value) {
        const newState = {};
        newState[state] = value;

        this.setState(newState);
    }

    // @TODO going to be a bit of a refactor but all state updates should go through here.
    updateMultiState(newState) {
        this.setState(newState);
    }

    // @TODO Should we have a base class for App that other can extend with overrides of ajaxHandler?
    ajaxHandler() {
        this.state.reloading = false;

        Ajax.doAjaxQuery('http://localhost:8081/defaultq.json')
            .then((data) => {
                this.state.stateHandler('positions', JSON.parse(data));
                this.state.stateHandler('greeting', 'Irons In The Fire');
                this.state.stateHandler('showingNewPositionTable', false);
            })
            .catch((err) => {
                this.state.stateHandler('greeting', `Oops: ${err}`)
            });
    }

    render() {
        // If we're expected to reload, go back to the ajax call.
        if(this.state.reloading) {
            this.ajaxHandler();
            return null;
        }

        const textStyle = {
                fontFamily: "helvetica, arial",
                fontSize: "12px"
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
                textAlign: 'left',
                verticalAlign: 'top',
            };

        return(
            <div style = {textStyle}>
                <Header greeting = {this.state.greeting}
                        stateHandler = {this.state.stateHandler}
                        positionDetails = {this.state.positionDetails}
                        showingNewPositionTable = {this.state.showingNewPositionTable}
                        positionID = {this.state.positionID}
                        updateMultiState = {this.updateMultiState.bind(this)}
                        getPristineState = {this.getPristineState.bind(this)}
                        buttonStyle = {styles.buttonStyle}
                        textfieldValStyle   = {this.state.textfieldValStyle}
                        divFieldStyle       = {this.state.divFieldStyle}
                        linkStyle           = {this.state.linkStyle}
                />
                <table
                    style = {tableStyle}
                >
                    <tbody>
                        <tr>
                            <th style = {cellStyle}>ID</th>
                            <th style = {cellStyle}>Job Title</th>
                            <th style = {cellStyle}>Employer</th>
                            <th style = {cellStyle}>Recruiter</th>
                            <th style = {cellStyle}>Role Type</th>
                            <th style = {cellStyle}>Status</th>
                            <th style = {cellStyle}>Duration</th>
                            <th style = {cellStyle}>Last Status Change</th>
                            <th style = {cellStyle}>Resume Version</th>
                            <th style = {cellStyle}>Remarks</th>
                        </tr>
                    {
                        // Here nodes of this.states.data become props in TableRow.
                        this.state.positions.map((position, i) => <TableRow
                            updateMultiState = {this.updateMultiState}
                            stateHandler = {this.state.stateHandler}
                            positionDetails = {this.state.positionDetails}
                            cellStyle = {cellStyle}
                            linkStyle = {this.state.linkStyle}
                            buttonStyle = {styles.buttonStyle}
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
            <AddNewPos
                stateHandler            = {this.props.stateHandler}
                positionDetails         = {this.props.positionDetails}
                showingNewPositionTable = {this.props.showingNewPositionTable}
                buttonStyle             = {styles.buttonStyle}
                textfieldValStyle       = {this.props.textfieldValStyle}
                divFieldStyle           = {this.props.divFieldStyle}
                linkStyle               = {this.props.linkStyle}
                positionID              = {this.props.positionID}
                updateMultiState        = {this.props.updateMultiState}
                getPristineState        = {this.props.getPristineState}
            />
            <PositionFilterTool />
          </div>
        );
    }
}

class AddNewPos extends Component {

    handleAddNewPosClick() {
        this.props.stateHandler('showingNewPositionTable', true)
    }

    handleCloseClick() {
        this.props.stateHandler('showingNewPositionTable', false);
    }

    linkForAddNewPos() {
        return (
            <button
                style = {this.props.buttonStyle}
                type="button"
                onClick = {this.handleAddNewPosClick.bind(this)}>
                Click to add a new position
            </button>
        );
    }

    createNewPos() {
        return (
            <EditPosition
                stateHandler        = {this.props.stateHandler}
                updateMultiState    = {this.props.updateMultiState}
                buttonStyle         = {this.props.buttonStyle}
                textfieldValStyle   = {this.props.textfieldValStyle}
                divFieldStyle       = {this.props.divFieldStyle}
                linkStyle           = {this.props.linkStyle}
                handleCloseClick    = {this.handleCloseClick.bind(this)}
                positionData        = {
                    {
                        employer: '1',
                        recruiter: '1',
                        status: '1',
                        resumeVersion: '1',
                        roleType: '1'
                    }
                }
                positionID          = {this.props.positionID}
                getPristineState    = {this.props.getPristineState}
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

    render() {
        this.rowClick = (e) => {
            this.props.updateMultiState({
                showingNewPositionTable: true,
                positionID: this.props.data.ID
            });
        };

        const posTitle = this.props.data.link ?
                <a
                    style = {this.props.linkStyle}
                    href = {this.props.data.link}
                    target = "_blank">{this.props.data.title}</a> :
                this.props.data.title;

        return(
            <tr data-position-id={this.props.data.ID}>
                <td onClick = {this.rowClick} style = {this.props.cellStyle}><span style = {this.props.buttonStyle}>{this.props.data.ID}</span></td>
                <td style = {this.props.cellStyle}>{posTitle}</td>
                <td style = {this.props.cellStyle}>{this.props.data.employerName}</td>
                <td style = {this.props.cellStyle}>{this.props.data.recruiterName}</td>
                <td style = {this.props.cellStyle}>{this.props.data.roleType}</td>
                <td style = {this.props.cellStyle}>{this.props.data.currentStatus}</td>
                <td style = {this.props.cellStyle}>{this.props.data.duration}</td>
                <td style = {this.props.cellStyle}>{new Date(this.props.data.lastStatusChange).toDateString()}</td>
                <td style = {this.props.cellStyle}>{this.props.data.resumeVersion}</td>
                <td style = {this.props.cellStyle}>{this.props.data.positionRemarks}</td>
            </tr>
        );
    }
}

export default App;
