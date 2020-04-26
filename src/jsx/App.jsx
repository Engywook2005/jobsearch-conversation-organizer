import Ajax from '../http/ajax';
import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();

        // State is mutable.
        this.states = {
            data: [
            ],
            greeting: "Job Convos data loading"
        };

        this.setStateHandler = this.setStateHandler.bind(this);

        this.ajaxHandler(this.setStateHandler, 'http://localhost:8081/');
    }

    setStateHandler(state, value) {
        const newState = {};
        newState[state] = value;

        this.setState(newState);
    }

    ajaxHandler(stateHandler, url) {
        Ajax.doAjaxQuery(url)
            .then((data) => {
                stateHandler('data', data);
                stateHandler('greeting', 'Irons In The Fire')
            })
            .catch((err) => {
                stateHandler('greeting', `Oops: ${err}`)
            });
    }

    render() {
        return(
            <div>
                <Header greeting = {this.states.greeting} />
                <table>
                    <tbody>
                        <tr>
                            <th>Job Title</th>
                            <th>Employer</th>
                            <th>Status</th>
                        </tr>
                    {
                        // Here nodes of this.states.data become props in TableRow.
                        this.states.data.map((position, i) => <TableRow
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
        return(
            <tr data-position-id="{this.props.data.ID}">
                <td>{this.props.data.title}</td>
                <td>{this.props.data.employer}</td>
                <td>{this.props.data.currentStatus}</td>
            </tr>
        );
    }
}

export default App;
